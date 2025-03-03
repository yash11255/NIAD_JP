import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

const uploadToCloudinary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "company_images" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(imageBuffer);
  });
};
//Register a company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    // Check if company already exists
    const companyExists = await Company.findOne({ email }).lean();
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile.buffer);

    // Create company
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUrl,
    });

    // Generate Token
    const token = generateToken(company._id);

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // cannot be accessed by client-side scripts
      secure: process.env.NODE_ENV === "production", // only send over HTTPS in production
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      message: "Company registered successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login Company
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the company exists
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Generate Token
    const token = generateToken(company._id);

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const postJob = async (req, res) => {
  try {
    // Destructure required fields from request body
    const {
      title,
      description,
      location,
      category,
      level,
      salary,
      visible = true,
      companyDetails,
    } = req.body;

    // Check if companyId exists in req (Ensure middleware sets it properly)
    if (!req.company || !req.company._id) {
      return res
        .status(400)
        .json({ success: false, message: "Company ID is missing" });
    }

    const companyId = req.company._id;

    // Basic validations
    if (!title || !description || !location || !category || !level || !salary) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Create new Job instance
    const newJob = new Job({
      title,
      description,
      location,
      category,
      level,
      salary,
      date: new Date(), // Ensure consistent date format
      visible,
      companyId,
      companyDetails,
    });

    // Save to database
    await newJob.save();

    // Return success response
    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id.toString();
    const { jobId } = req.params;

    const filter = { companyId };

    if (jobId) {
      filter.jobId = jobId;

      // OPTIONAL: Validate that the job exists and belongs to the company
      const job = await Job.findById(jobId);
      if (!job) {
        return res
          .status(404)
          .json({ success: false, message: "Job not found" });
      }
      if (job.companyId.toString() !== companyId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: This job does not belong to your company.",
        });
      }
    }

    // Retrieve job applications matching the filter
    const applications = await JobApplication.find(filter)
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company;

    const jobs = await Job.find({ companyId });

    // Adding No. of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change Job Application Status
export const ChangeJobApplicationsStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const companyId = req.company._id.toString();

    // Find the job application by its ID
    const jobApplication = await JobApplication.findOne({ _id: id });
    if (!jobApplication) {
      return res
        .status(404)
        .json({ success: false, message: "Job application not found" });
    }

    // Check if the job application belongs to the authenticated company
    if (jobApplication.companyId.toString() !== companyId) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized: You are not allowed to update the status of this job application.",
      });
    }

    // Update the job application's status
    jobApplication.status = status;
    await jobApplication.save();

    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Job Visiblity
export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    //here i am checking that if this is the authenticated job or not
    if (companyId.toString() !== job.companyId.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized: You cannot change the visibility of a job that does not belong to your company.",
      });
    }

    job.visible = !job.visible;
    await job.save();

    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during logout" });
  }
};

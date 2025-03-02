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

  console.log("Received:", name, email, password);

  try {
    // Check if company already exists
    console.log("Checking database for existing company...");
    const companyExists = await Company.findOne({ email }).lean();
    console.log("Company Exists:", companyExists);

    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Upload image
    console.log("Uploading image to Cloudinary...");
    const imageUrl = await uploadToCloudinary(imageFile.buffer);

    console.log("Image uploaded successfully:", imageUrl);

    // Create company
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUrl,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Error:", error);
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

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });

    console.log("Generated Token:", token);
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
      visible = true, // Default value if not provided
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
    const companyId = req.company._id;

    // Find job applications for the user and populate related data
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

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

    // Find Job application and update status
    await JobApplication.findOneAndUpdate({ _id: id }, { status });

    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change Job Visiblity
export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;

    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

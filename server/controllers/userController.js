import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import streamifier from "streamifier";

//register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token (expires in 1 day)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Not accessible via client-side scripts
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    // Respond without including the token in the JSON
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token (expires in 1 day)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Respond without including the token in the JSON
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Data
export const getUserData = async (req, res) => {
  // Access the user id set by the middleware
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Apply For Job
export const applyForJob = async (req, res) => {
  const { companyId, ...applicationData } = req.body;
  const userId = req.user.id;
  const jobId = req.params.id;

  try {
    // Check if the job exists
    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job Not Found" });
    }

    if (companyId && jobData.companyId.toString() !== companyId) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid request: the selected job does not belong to the specified company.",
      });
    }

    const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    if (isAlreadyApplied.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Already Applied" });
    }

    // Create a new job application including the detailed form data
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      applicationData,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No job applications found for this user.",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Resume
// controllers/userController.js
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeFile = req.file; // from memory storage

    if (!resumeFile) {
      return res.json({
        success: false,
        message: "No file received by Multer",
      });
    }

    // Convert Multer's buffer to a readable stream and upload to Cloudinary
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "resumes" }, // optional: specify a folder in your Cloudinary account
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const uploadResult = await streamUpload(resumeFile.buffer);

    // Update user record in DB
    const userData = await User.findById(userId);
    userData.resume = uploadResult.secure_url;
    await userData.save();

    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  loginUser,
  registerUser,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

//register
router.post("/user-register", registerUser); //tested

//login
router.post("/user-login", loginUser); //tested

// Get user Data
router.get("/user", authenticate, getUserData); //tested

// Apply for a job
router.post("/apply", authenticate, applyForJob); //tested

// Get applied jobs data
router.get("/applications", authenticate, getUserJobApplications); //tested

// update user resume
router.post(
  "/update-resume",
  authenticate,
  upload.single("resume"),
  updateUserResume
); //tested

export default router;

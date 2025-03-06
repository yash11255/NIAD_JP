import express from "express";
import {
  ChangeInterviewStatus,
  ChangeJobApplicationsStatus,
  ChangeOnboardingStatus,
  changeVisiblity,
  getCompaniesWithJobs,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  logout,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany); //tested - integrated

// Company login
router.post("/login", loginCompany); //tested - integrated

// Get company data
router.get("/company", protectCompany, getCompanyData); //tested - integrated

// Post a job
router.post("/post-job", protectCompany, postJob); //tested - integrated

// Get Applicants Data of Company
router.get("/applicants/:jobId", protectCompany, getCompanyJobApplicants); //tested

// Get  Company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJobs); //tested - integrated

//get all jobs and companies
router.get("/jnc", getCompaniesWithJobs);

// Change Applcations Status
router.post("/change-status", protectCompany, ChangeJobApplicationsStatus); //tested

// Change Interview Status
router.post("/change-int", protectCompany, ChangeInterviewStatus); //tested

// Change Onbaording Status
router.post("/change-onboard", protectCompany, ChangeOnboardingStatus); //tested

// Change Applcations Visiblity
router.post("/change-visibility", protectCompany, changeVisiblity); //tested - Integrated

//logout
router.post("/logout", protectCompany, logout); //tested  - integrated

export default router;

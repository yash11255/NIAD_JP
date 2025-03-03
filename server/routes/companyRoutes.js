import express from "express";
import {
  ChangeJobApplicationsStatus,
  changeVisiblity,
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
router.post("/register", upload.single("image"), registerCompany); //tested - cnf

// Company login
router.post("/login", loginCompany); //tested - cnf

// Get company data
router.get("/company", protectCompany, getCompanyData); //tested

// Post a job
router.post("/post-job", protectCompany, postJob); //tested - cnf

// Get Applicants Data of Company
router.get("/applicants/:jobId", protectCompany, getCompanyJobApplicants); //tested

// Get  Company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJobs); //tested-cnf

// Change Applcations Status
router.post("/change-status", protectCompany, ChangeJobApplicationsStatus); //tested

// Change Applcations Visiblity
router.post("/change-visibility", protectCompany, changeVisiblity); //tested -cnf

//logout
router.post("/logout", protectCompany, logout);

export default router;

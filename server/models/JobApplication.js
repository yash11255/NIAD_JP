import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicationData: { type: Object, required: true }, // New field to store form details
  status: { type: String, default: "Pending" },
  interview: { type: String, default: "Not Interviewed" },
  onboarding: { type: String, default: "Not Onboarded" },
  date: { type: Number, required: true },
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;

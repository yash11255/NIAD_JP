import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true }, // Could be Enum ["Beginner", "Intermediate", "Expert"]
    salary: { type: Number, required: true },
    date: { type: Number, required: true }, // Consider changing to `Date` type
    visible: { type: Boolean, default: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    companyDetails: {
        name: { type: String, required: true },
        shortDescription: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    }
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
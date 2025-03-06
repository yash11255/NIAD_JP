// ApplyJob.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import JobCard from "../Components/Jobcard";

// CHANGED CODE: Helper function to style the status badge
const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Accepted":
      return "bg-green-500 text-white";
    case "Rejected":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-300 text-gray-800";
  }
};

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobsData, setJobData] = useState(null);
  const { jobs, userApplications } = useContext(AppContext);
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const selectedJob = jobs.find((job) => job._id === id);
    if (selectedJob) {
      setJobData(selectedJob);
      // Get similar jobs by matching role or location
      const filteredJobs = jobs
        .filter(
          (job) =>
            job._id !== id &&
            (job.level === selectedJob.level ||
              job.location === selectedJob.location)
        )
        .slice(0, 4);
      setSimilarJobs(filteredJobs);
    }
  }, [id, jobs]);

  // CHANGED CODE: Determine if the user has applied for this job
  const userApplication =
    jobsData &&
    userApplications &&
    userApplications.find((app) => app.jobId._id === jobsData._id);
  const hasApplied = Boolean(userApplication);

  const handleApplyNow = () => {
    if (hasApplied) {
      return;
    }
    navigate(`/apply-job-form/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-20 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Section: Job Details */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-3/4">
          {jobsData ? (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6">
                <div className="flex items-center gap-6">
                  <img
                    className="h-20 w-20 bg-white rounded-md shadow-sm"
                    src={assets.company_icon}
                    alt="Company Logo"
                  />
                  <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                      {jobsData.title}
                    </h1>
                    <p className="text-gray-500">{jobsData.companyId.name}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                        📍 {jobsData.location}
                      </span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md">
                        ⚡ {jobsData.level}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md">
                        💰 CTC: {jobsData.salary}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <button
                    onClick={handleApplyNow}
                    disabled={hasApplied}
                    className={`px-6 py-2 rounded-md font-medium shadow-md transition ${
                      hasApplied
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {hasApplied ? "Already Applied" : "Apply Now"}
                  </button>
                  <p className="text-gray-500 text-sm mt-2">
                    Posted {moment(jobsData.date).fromNow()}
                  </p>
                </div>
              </div>

              {/* CHANGED CODE: Display application status if the user has applied */}
              {hasApplied && (
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Your Application Status:{" "}
                    <span
                      className={`px-3 py-1 rounded-md text-sm ${getStatusBadgeColor(
                        userApplication.status
                      )}`}
                    >
                      {userApplication.status}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Job Description
                </h2>
                <div
                  className="text-gray-700 mt-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: jobsData.description }}
                ></div>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Responsibilities & Requirements
                </h2>
                <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                  {jobsData.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t pt-4 text-gray-600 flex flex-wrap justify-between">
                <p>
                  📅 Application Deadline:{" "}
                  <span className="font-medium">
                    {moment(jobsData.deadline).format("MMMM Do, YYYY")}
                  </span>
                </p>
                <p>
                  🏢 Work Type:{" "}
                  <span className="font-medium">{jobsData.workType}</span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Loading job details...</p>
          )}
        </div>

        {/* Right Sidebar: Similar Jobs */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
              Similar Jobs
            </h2>
            <div className="space-y-4 mt-4">
              {similarJobs.length > 0 ? (
                similarJobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-gray-500 text-center">
                  No similar jobs found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;

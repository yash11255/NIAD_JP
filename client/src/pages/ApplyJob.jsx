import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import JobCard from "../Components/Jobcard";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Accepted":
      return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm";
    case "Rejected":
      return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm";
    default:
      return "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 shadow-sm";
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

  const userApplication =
    jobsData &&
    userApplications &&
    userApplications.find((app) => app.jobId._id === jobsData._id);
  const hasApplied = Boolean(userApplication);

  const handleApplyNow = () => {
    if (hasApplied) return;
    navigate(`/apply-job-form/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-20 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Section: Job Details */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full lg:w-3/4 border border-gray-100">
          {jobsData ? (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
                <div className="flex items-start gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-xl transition-all duration-300 group-hover:blur-2xl"></div>
                    <img
                      className="h-20 w-20 bg-white rounded-lg shadow-md relative transition-transform duration-300 group-hover:scale-105"
                      src={jobsData.companyId.image || assets.default_company_logo}
                      alt="Company Logo"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">
                      {jobsData.title}
                    </h1>
                    <p className="text-gray-600 font-medium mb-3">{jobsData.companyId.name}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {jobsData.location}
                      </span>
                      <span className="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {jobsData.level}
                      </span>
                      <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {jobsData.salary}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:text-right">
                  <button
                    onClick={handleApplyNow}
                    disabled={hasApplied}
                    className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                      hasApplied
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    }`}
                  >
                    {hasApplied ? "Already Applied" : "Apply Now"}
                  </button>
                  <p className="text-gray-500 text-sm mt-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Posted {moment(jobsData.date).fromNow()}
                  </p>
                </div>
              </div>

              {hasApplied && (
                <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    {userApplication.status === "Accepted" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : userApplication.status === "Rejected" ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-500" />
                    )}
                    Application Status
                  </h3>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeColor(
                        userApplication.status
                      )}`}
                    >
                      {userApplication.status}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Last updated: {moment(userApplication.updatedAt).fromNow()}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  About This Role
                </h2>
                <div
                  className="text-gray-600 leading-relaxed space-y-4 prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: jobsData.description }}
                ></div>
              </div>

              {/* <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  About company
                </h2>
                <ul className="grid gap-3">
                  {jobsData.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-gray-700 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Application Deadline</span>
                      <br />
                      <span className="text-blue-700">
                        {moment(jobsData.className).format("MMMM Do, YYYY")}
                      </span>
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-gray-700 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold">Work Type</span>
                      <br />
                      <span className="text-purple-700">{jobsData.workType}</span>
                    </p>
                  </div>
                </div>
              </div> */}
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-gray-500">Loading job details...</div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Similar Jobs */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Similar Opportunities
            </h2>
            <div className="space-y-4">
              {similarJobs.length > 0 ? (
                similarJobs.map((job) => (
                  <div key={job._id} className="transform transition-all duration-300 hover:scale-[1.02]">
                    <JobCard job={job} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No similar jobs available at the moment.
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
// ViewApplications.js
"use client";

import { useContext, useState } from "react";
import {
  ChevronLeft,
  Briefcase,
  User,
  GraduationCap,
  MapPin,
  Building,
  Clock,
} from "lucide-react";
import { AppContext } from "../context/AppContext";

/**
 * Helper to get a Tailwind color class for a given status.
 */
function getStatusBadgeColor(status) {
  switch (status) {
    case "Accepted":
      return "bg-green-500 text-white";
    case "Rejected":
      return "bg-red-500 text-white";
    case "Onboarded":
      return "bg-blue-500 text-white";
    case "Interviewed":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-300 text-gray-800";
  }
}

const ViewApplications = () => {
  const {
    jobs,
    jobApplicants,
    fetchJobApplicants,
    jobAppData,
    changeJobApplicationStatus, // CHANGED CODE: import the new API function
  } = useContext(AppContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 2;

  const handleJobClick = async (job) => {
    setSelectedJob(job);
    setLoading(true);
    await fetchJobApplicants(job._id);
    setLoading(false);
    setCurrentPage(1);
  };

  if (!selectedJob) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl font-sans">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Job Applications
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Available Positions</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-blue-300"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    {job.location && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl font-sans">
        <button
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md mb-6 hover:bg-gray-600 transition"
          onClick={() => setSelectedJob(null)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </button>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (jobApplicants.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl font-sans">
        <button
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md mb-6 hover:bg-gray-600 transition"
          onClick={() => setSelectedJob(null)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </button>
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <User className="h-12 w-12 text-gray-400" />
            <h3 className="text-xl font-medium">No Applications Found</h3>
            <p className="text-gray-500">
              There are currently no applications for this position.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalApplicants = jobApplicants.length;
  const totalPages = Math.ceil(totalApplicants / applicantsPerPage);
  const startIndex = (currentPage - 1) * applicantsPerPage;
  const endIndex = startIndex + applicantsPerPage;
  const currentApplicants = jobApplicants.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">{selectedJob.title}</h2>
        <button
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          onClick={() => setSelectedJob(null)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, totalApplicants)} of{" "}
          {totalApplicants} candidates
        </p>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="space-y-6">
        {currentApplicants.map((app, index) => {
          const data = app;
          // console.log("this is status", data.status);
          const badgeColor = getStatusBadgeColor(data.status);
          const applicantName = data.userId?.name || "N/A";
          const initials =
            applicantName !== "N/A"
              ? applicantName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "NA";

          return (
            <div
              key={data._id || index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 p-4 pb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      data.interview === "Interviewed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {data.interview || "Not Interviewed"}
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      data.onboarding === "Onboarded"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {data.onboarding || "Not Onboarded"}
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      data.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {data.status || "Pending"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{applicantName}</h3>
                      <p className="text-sm text-gray-500">
                        {data.applicationData.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-6">
                  {/* Toggle Interview */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Interview</span>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        onChange={() =>
                          setData((prev) => ({
                            ...prev,
                            interview:
                              prev.interview === "Interviewed"
                                ? "Not Interviewed"
                                : "Interviewed",
                          }))
                        }
                        checked={data.interview === "Interviewed"}
                      />
                      <span
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-300 rounded-full ${
                          data.interview === "Interviewed"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span
                        className={`absolute left-1 top-1 transition-all duration-300 bg-white rounded-full w-4 h-4 transform ${
                          data.interview === "Interviewed"
                            ? "translate-x-6"
                            : ""
                        }`}
                      ></span>
                    </label>
                  </div>

                  {/* Toggle Onboarding */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Onboarding</span>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        onChange={() =>
                          setData((prev) => ({
                            ...prev,
                            onboarding:
                              prev.onboarding === "Onboarded"
                                ? "Not Onboarded"
                                : "Onboarded",
                          }))
                        }
                        checked={data.onboarding === "Onboarded"}
                      />
                      <span
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-300 rounded-full ${
                          data.onboarding === "Onboarded"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span
                        className={`absolute left-1 top-1 transition-all duration-300 bg-white rounded-full w-4 h-4 transform ${
                          data.onboarding === "Onboarded" ? "translate-x-6" : ""
                        }`}
                      ></span>
                    </label>
                  </div>

                  {/* Toggle Accept/Reject */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Decision</span>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        onChange={async () => {
                          const newStatus =
                            data.status === "Accepted"
                              ? "Rejected"
                              : "Accepted";
                          await changeJobApplicationStatus(data._id, newStatus); // CHANGED CODE: call API function
                        }}
                        checked={data.status === "Accepted"}
                      />
                      <span
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-300 rounded-full ${
                          data.status === "Accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={`absolute left-1 top-1 transition-all duration-300 bg-white rounded-full w-4 h-4 transform ${
                          data.status === "Accepted" ? "translate-x-6" : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "personal"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab("education")}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "education"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "experience"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab("address")}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "address"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Address
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">
                        {data.applicationData?.dateOfBirth || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Father's Name</p>
                      <p className="font-medium">
                        {data.applicationData.fathersName || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">
                        {data.applicationData.gender || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Marital Status</p>
                      <p className="font-medium">
                        {data.applicationData.maritalStatus || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="font-medium">
                        {data.applicationData.nationality || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Aadhaar</p>
                      <p className="font-medium">
                        {data.applicationData.aadhaarNumber || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">
                        {data.applicationData.phoneNumber || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Alternate Phone</p>
                      <p className="font-medium">
                        {data.applicationData.altNumber || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="font-medium">
                        {data.applicationData.height || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="font-medium">
                        {data.applicationData.jobTitle || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {data.applicationData.location || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">
                        {data.applicationData.experience || "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "education" && (
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          10th Standard
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Board</p>
                            <p className="font-medium">
                              {data.applicationData.education.tenth.board ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">
                              {data.applicationData.education?.tenth?.year ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Percentage</p>
                            <p className="font-medium">
                              {data.applicationData.education?.tenth
                                ?.percentage || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          12th Standard
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Board</p>
                            <p className="font-medium">
                              {data.applicationData.education?.twelfth?.board ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">
                              {data.applicationData.education?.twelfth?.year ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Percentage</p>
                            <p className="font-medium">
                              {data.applicationData.education?.twelfth
                                ?.percentage || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Graduation
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Degree</p>
                            <p className="font-medium">
                              {data.applicationData.education?.graduation
                                ?.degree || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">University</p>
                            <p className="font-medium">
                              {data.applicationData.education?.graduation
                                ?.university || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">
                              {data.applicationData.education?.graduation
                                ?.yearOfGraduation || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">CGPA</p>
                            <p className="font-medium">
                              {data.applicationData.education?.graduation
                                ?.cgpa || "N/A"}
                            </p>
                          </div>
                        </div>

                        {data.applicationData.education?.graduation
                          ?.certifications?.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm text-gray-500 mb-2">
                              Certifications
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {data.applicationData.education.graduation.certifications.map(
                                (cert, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                                  >
                                    {cert}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Apprenticeship
                      </h3>
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Company</p>
                            <p className="font-medium">
                              {data.applicationData.apprenticeship
                                ?.companyName || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Tenure</p>
                            <p className="font-medium">
                              {data.applicationData.apprenticeship?.tenure ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Salary</p>
                            <p className="font-medium">
                              {data.applicationData.apprenticeship
                                ?.salaryStipend || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">
                              {data.applicationData.apprenticeship?.location ||
                                "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Work Experience
                      </h3>

                      {data.applicationData.workExperiences?.length ? (
                        <div className="space-y-4">
                          {data.applicationData.workExperiences.map(
                            (exp, i) => (
                              <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">
                                      Company
                                    </p>
                                    <p className="font-medium">
                                      {exp.companyName || "N/A"}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">
                                      Job Role
                                    </p>
                                    <p className="font-medium">
                                      {exp.jobRole || "N/A"}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">
                                      Tenure
                                    </p>
                                    <p className="font-medium">
                                      {exp.tenure || "N/A"}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">
                                      Salary
                                    </p>
                                    <p className="font-medium">
                                      {exp.salaryStipend || "N/A"}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">
                                      Location
                                    </p>
                                    <p className="font-medium">
                                      {exp.location || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="text-gray-500">No work experience</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "address" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Permanent Address
                        </h4>
                      </div>
                      <div className="p-4">
                        <p>
                          {data.applicationData?.permanentAddress
                            ? `${data.applicationData.permanentAddress.street}, 
                               ${data.applicationData.permanentAddress.city}, 
                               ${data.applicationData.permanentAddress.state}, 
                               ${data.applicationData.permanentAddress.pincode}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Current Address
                        </h4>
                      </div>
                      <div className="p-4">
                        <p>
                          {data.applicationData?.currentAddress
                            ? `${data.applicationData.currentAddress.street}, 
                               ${data.applicationData.currentAddress.city}, 
                               ${data.applicationData.currentAddress.state}, 
                               ${data.applicationData.currentAddress.pincode}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;

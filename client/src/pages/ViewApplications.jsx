import React, { useContext, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { AppContext } from "../context/AppContext";

/**
 * Helper to get a Tailwind color class for a given status.
 * Customize as you see fit (e.g., "Onboarded", "Interviewed").
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
  const { jobs, jobApplicants, fetchJobApplicants } = useContext(AppContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 2; // Adjust as desired

  // When a job is selected, fetch its applicants
  const handleJobClick = async (job) => {
    setSelectedJob(job);
    setLoading(true);
    await fetchJobApplicants(job._id);
    setLoading(false);
    setCurrentPage(1); // reset to first page whenever a new job is selected
  };

  // If job not selected, show job list
  if (!selectedJob) {
    return (
      <div className="p-4 md:p-6 font-sans">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
          Job Applications
        </h2>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3">Available Jobs</h3>
          <ul className="divide-y divide-gray-300">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer transition rounded-lg mb-2"
                onClick={() => handleJobClick(job)}
              >
                {job.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Show loading or no applicants
  if (loading) {
    return (
      <div className="p-4 md:p-6 font-sans">
        <button
          className="block mx-auto bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
          onClick={() => setSelectedJob(null)}
        >
          <ChevronLeft className="inline mr-1" size={18} /> Back to Jobs
        </button>
        <p className="text-center text-gray-600">Loading applications...</p>
      </div>
    );
  }

  if (jobApplicants.length === 0) {
    return (
      <div className="p-4 md:p-6 font-sans">
        <button
          className="block mx-auto bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
          onClick={() => setSelectedJob(null)}
        >
          <ChevronLeft className="inline mr-1" size={18} /> Back to Jobs
        </button>
        <p className="text-center text-gray-600">No applications found.</p>
      </div>
    );
  }

  // Pagination logic
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
    <div className="p-4 md:p-6 font-sans">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        {selectedJob.title} - Candidates
      </h2>
      <button
        className="block mx-auto bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
        onClick={() => setSelectedJob(null)}
      >
        <ChevronLeft className="inline mr-1" size={18} /> Back to Jobs
      </button>

      {/* Applicant Cards */}
      {currentApplicants.map((app, index) => {
        // 'app' is a single applicant record
        const data = app || {};
        // If your API returns something like { status: "Accepted" }, show it:
        const badgeColor = getStatusBadgeColor(data.status);
        const applicantName = data.userId?.name || "N/A";

        return (
          <div
            key={data._id || index}
            className="bg-white shadow-md rounded-md p-4 mb-6"
          >
            {/* Header: Name + Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold">
                Applicant: {applicantName}
              </h3>
              <span
                className={`inline-block px-3 py-1 mt-2 sm:mt-0 rounded-md text-sm font-medium ${badgeColor}`}
              >
                {data.status || "No Status"}
              </span>
            </div>

            {/* Personal Info */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Personal Info</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span className="font-semibold">Date of Birth: </span>
                  {data.dateOfBirth || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Father's Name: </span>
                  {data.fathersName || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Gender: </span>
                  {data.gender || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Marital Status: </span>
                  {data.maritalStatus || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Nationality: </span>
                  {data.nationality || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Aadhaar: </span>
                  {data.aadhaarNumber || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Phone: </span>
                  {data.phoneNumber || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Alternate: </span>
                  {data.altNumber || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Email: </span>
                  {data.email || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Height: </span>
                  {data.height || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Job Title: </span>
                  {data.jobTitle || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Location: </span>
                  {data.location || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Experience: </span>
                  {data.experience || "N/A"}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Education</h4>
              <div className="mt-2 text-sm">
                <p className="font-semibold">10th Standard</p>
                <p>Board: {data.education?.tenth?.board || "N/A"}</p>
                <p>Year: {data.education?.tenth?.year || "N/A"}</p>
                <p>Percentage: {data.education?.tenth?.percentage || "N/A"}</p>
              </div>
              <div className="mt-2 text-sm">
                <p className="font-semibold">12th Standard</p>
                <p>Board: {data.education?.twelfth?.board || "N/A"}</p>
                <p>Year: {data.education?.twelfth?.year || "N/A"}</p>
                <p>
                  Percentage: {data.education?.twelfth?.percentage || "N/A"}
                </p>
              </div>
              <div className="mt-2 text-sm">
                <p className="font-semibold">Graduation</p>
                <p>Degree: {data.education?.graduation?.degree || "N/A"}</p>
                <p>
                  University: {data.education?.graduation?.university || "N/A"}
                </p>
                <p>
                  Year: {data.education?.graduation?.yearOfGraduation || "N/A"}
                </p>
                <p>CGPA: {data.education?.graduation?.cgpa || "N/A"}</p>
                <p>
                  Certifications:{" "}
                  {data.education?.graduation?.certifications?.length
                    ? data.education.graduation.certifications.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Addresses */}
            <div className="mt-4 text-sm">
              <h4 className="font-medium text-gray-700">Address</h4>
              <p className="mt-2 font-semibold">Permanent Address:</p>
              <p>{data.address?.permanentAddress || "N/A"}</p>
              <p className="mt-2 font-semibold">Current Address:</p>
              <p>{data.address?.currentAddress || "N/A"}</p>
            </div>

            {/* Apprenticeship */}
            <div className="mt-4 text-sm">
              <h4 className="font-medium text-gray-700">Apprenticeship</h4>
              <p>Company: {data.apprenticeship?.companyName || "N/A"}</p>
              <p>Tenure: {data.apprenticeship?.tenure || "N/A"}</p>
              <p>Salary: {data.apprenticeship?.salaryStipend || "N/A"}</p>
              <p>Location: {data.apprenticeship?.location || "N/A"}</p>
            </div>

            {/* Work Experiences */}
            <div className="mt-4 text-sm">
              <h4 className="font-medium text-gray-700">Work Experience</h4>
              {data.workExperiences?.length ? (
                data.workExperiences.map((exp, i) => (
                  <div key={i} className="mt-2 border-l-4 border-blue-300 pl-2">
                    <p>Company: {exp.companyName || "N/A"}</p>
                    <p>Tenure: {exp.tenure || "N/A"}</p>
                    <p>Salary/Stipend: {exp.salaryStipend || "N/A"}</p>
                    <p>Location: {exp.location || "N/A"}</p>
                    <p>Job Role: {exp.jobRole || "N/A"}</p>
                  </div>
                ))
              ) : (
                <p>No work experiences</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Prev
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewApplications;

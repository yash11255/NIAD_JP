import React, { useState } from "react";
import { viewApplicationsPageData } from "../assets/assets";
import { ChevronLeft, ChevronRight, Check, X, Eye } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const ViewApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [selectedJob, setSelectedJob] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [onboardStatuses, setOnboardStatuses] = useState({});
  const [interviewStatuses, setInterviewStatuses] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const uniqueJobs = Array.from(
    new Map(
      viewApplicationsPageData.map((app) => [
        app.jobId,
        { jobId: app.jobId, jobTitle: app.jobTitle },
      ])
    ).values()
  );

  const jobTitles = [
    ...new Set(viewApplicationsPageData.map((app) => app.jobTitle)),
  ];

  const handleJobClick = (job) => {
    navigate(`/view-applications/${job.jobId}`);
  };

  // Navigate back to the job list (remove jobId from URL)
  const handleBackToJobs = () => {
    navigate("/view-applications");
  };

  const handleAccept = (userId) => {
    setStatuses((prev) => ({ ...prev, [userId]: "Accepted" }));
  };

  const handleReject = (userId) => {
    setStatuses((prev) => ({ ...prev, [userId]: "Rejected" }));
  };

  const handleOnboardStatusChange = (userId, status) => {
    setOnboardStatuses((prev) => ({ ...prev, [userId]: status }));
  };

  const handleInterviewStatusChange = (userId, status) => {
    setInterviewStatuses((prev) => ({ ...prev, [userId]: status }));
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeDetails = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="p-4 md:p-6 font-sans">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Job Applications
      </h2>

      {!selectedJob && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3">Available Jobs</h3>
          <ul className="divide-y divide-gray-300">
            {jobTitles.map((job, index) => (
              <li
                key={index}
                className="p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer transition rounded-lg mb-2"
                onClick={() => setSelectedJob(job)}
              >
                {job}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedJob && !selectedCandidate && (
        <div className="mt-6">
          <h3 className="text-center text-xl font-semibold mb-4">
            {selectedJob} - Candidates
          </h3>
          <button
            className="block mx-auto bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
            onClick={() => setSelectedJob(null)}
          >
            <ChevronLeft className="inline mr-1" size={18} /> Back to Jobs
          </button>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    10th Board
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    10th Year
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    10th %
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    12th Board
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    12th Year
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    12th %
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Onboard Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Interview Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {viewApplicationsPageData
                  .filter((app) => app.jobTitle === selectedJob)
                  .map((app, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.name}
                        </div>
                        <div className="text-sm text-gray-500">{app.email}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.location}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.experience} years
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.tenth?.board || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.tenth?.year || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.tenth?.percentage || "N/A"}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.twelfth?.board || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.twelfth?.year || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.twelfth?.percentage || "N/A"}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.education?.graduation?.degree || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            statuses[app.userId] === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : statuses[app.userId] === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {statuses[app.userId] || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <select
                          className="text-sm border rounded p-1 w-full"
                          value={onboardStatuses[app.userId] || "Pending"}
                          onChange={(e) =>
                            handleOnboardStatusChange(
                              app.userId,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Onboarded">Onboarded</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <select
                          className="text-sm border rounded p-1 w-full"
                          value={interviewStatuses[app.userId] || "Pending"}
                          onChange={(e) =>
                            handleInterviewStatusChange(
                              app.userId,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="No Show">No Show</option>
                          <option value="Rescheduled">Rescheduled</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(app)}
                            className="bg-blue-500 text-white p-1.5 rounded-md hover:bg-blue-600 transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleAccept(app.userId)}
                            className="bg-green-500 text-white p-1.5 rounded-md hover:bg-green-600 transition"
                            title="Accept"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(app.userId)}
                            className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCandidate && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              onClick={closeDetails}
            >
              <ChevronLeft className="inline mr-1" size={18} /> Back to
              Candidates
            </button>
            <h3 className="text-xl font-semibold">Candidate Details</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  handleAccept(selectedCandidate.userId);
                  closeDetails();
                }}
                className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition flex items-center"
              >
                <Check size={16} className="mr-1" /> Accept
              </button>
              <button
                onClick={() => {
                  handleReject(selectedCandidate.userId);
                  closeDetails();
                }}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition flex items-center"
              >
                <X size={16} className="mr-1" /> Reject
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h4 className="text-lg font-semibold mb-4">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedCandidate.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium">{selectedCandidate.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-medium">{selectedCandidate.jobTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{selectedCandidate.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{selectedCandidate.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Marital Status</p>
                  <p className="font-medium">
                    {selectedCandidate.maritalStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="font-medium">{selectedCandidate.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aadhaar Number</p>
                  <p className="font-medium">
                    {selectedCandidate.aadhaarNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{selectedCandidate.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedCandidate.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">
                    {selectedCandidate.experience} years
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-b">
              <h4 className="text-lg font-semibold mb-4">Education</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-600">10th Standard</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Board</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.tenth?.board || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.tenth?.year || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Percentage</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.tenth?.percentage ||
                          "N/A"}
                        %
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-blue-600">12th Standard</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Board</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.twelfth?.board || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.twelfth?.year || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Percentage</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.twelfth?.percentage ||
                          "N/A"}
                        %
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-blue-600">Graduation</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.graduation?.degree ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.graduation?.university ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Year of Graduation
                      </p>
                      <p className="font-medium">
                        {selectedCandidate.education?.graduation
                          ?.yearOfGraduation || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">CGPA</p>
                      <p className="font-medium">
                        {selectedCandidate.education?.graduation?.cgpa || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-blue-600">Certifications</h5>
                  <p className="mt-2">
                    {selectedCandidate.education?.certifications?.join(", ") ||
                      "None"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">
                Address Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-blue-600 mb-2">
                    Permanent Address
                  </h5>
                  <p>{selectedCandidate.permanentAddress?.street}</p>
                  <p>
                    {selectedCandidate.permanentAddress?.city},{" "}
                    {selectedCandidate.permanentAddress?.state}
                  </p>
                  <p>{selectedCandidate.permanentAddress?.pincode}</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-600 mb-2">
                    Current Address
                  </h5>
                  {selectedCandidate.currentAddress?.city ===
                  selectedCandidate.permanentAddress?.city ? (
                    <p>Same as Permanent Address</p>
                  ) : (
                    <>
                      <p>{selectedCandidate.currentAddress?.street}</p>
                      <p>
                        {selectedCandidate.currentAddress?.city},{" "}
                        {selectedCandidate.currentAddress?.state}
                      </p>
                      <p>{selectedCandidate.currentAddress?.pincode}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50">
              <h4 className="text-lg font-semibold mb-4">Application Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Status
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={statuses[selectedCandidate.userId] || "Pending"}
                    onChange={(e) =>
                      setStatuses((prev) => ({
                        ...prev,
                        [selectedCandidate.userId]: e.target.value,
                      }))
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Onboard Status
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={
                      onboardStatuses[selectedCandidate.userId] || "Pending"
                    }
                    onChange={(e) =>
                      handleOnboardStatusChange(
                        selectedCandidate.userId,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Onboarded">Onboarded</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interview Status
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={
                      interviewStatuses[selectedCandidate.userId] || "Pending"
                    }
                    onChange={(e) =>
                      handleInterviewStatusChange(
                        selectedCandidate.userId,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="No Show">No Show</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;

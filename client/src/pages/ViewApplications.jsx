import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { ChevronLeft, Eye, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewApplications = () => {
  const { jobs, jobApplicants, fetchJobApplicants } = useContext(AppContext);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  // Handle job selection to fetch applicants
  const handleJobClick = (job) => {
    setSelectedJobTitle(job.title);
    fetchJobApplicants(job._id);
  };

  // Handle viewing candidate details
  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Close candidate details view
  const closeDetails = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="p-4 md:p-6 font-sans">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Job Applications
      </h2>

      {/* Step 1: Display List of Jobs */}
      {!selectedJobTitle && (
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
      )}

      {/* Step 2: Display Applicants for the Selected Job */}
      {selectedJobTitle && !selectedCandidate && (
        <div className="mt-6">
          <h3 className="text-center text-xl font-semibold mb-4">
            {selectedJobTitle} - Candidates
          </h3>
          <button
            className="block mx-auto bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
            onClick={() => setSelectedJobTitle(null)}
          >
            <ChevronLeft className="inline mr-1" size={18} /> Back to Jobs
          </button>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    10th Board
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    10th Year
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    10th %
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    12th Board
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    12th Year
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    12th %
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Qualification
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobApplicants.map((app, index) => {
                  const applicationDetails =
                    app.applicationData?.applicationData || {};

                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {applicationDetails.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {applicationDetails.email || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.location || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.experience
                          ? `${applicationDetails.experience} years`
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.tenth?.board || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.tenth?.year || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.tenth?.percentage
                          ? `${applicationDetails.education?.tenth?.percentage}%`
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.twelfth?.board || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.twelfth?.year || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.twelfth?.percentage
                          ? `${applicationDetails.education?.twelfth?.percentage}%`
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.graduation?.degree ||
                          "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.graduation?.university ||
                          "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.graduation?.cgpa ||
                          "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {applicationDetails.education?.graduation?.certifications?.join(
                          ", "
                        ) || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;

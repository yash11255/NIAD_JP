import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ChevronLeft } from "lucide-react";

const ViewApplications = () => {
  const { jobs, jobApplicants, fetchJobApplicants } = useContext(AppContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // Track Interviewed, Onboarded, Accept/Reject status for each applicant
  const [applicationStatus, setApplicationStatus] = useState({});

  // Handle job selection
  const handleJobClick = async (job) => {
    setSelectedJob(job);
    setLoading(true);
    await fetchJobApplicants(job._id);
    setLoading(false);
  };

  // Update application status state
  const handleActionClick = (applicantId, actionType, value) => {
    setApplicationStatus((prevState) => ({
      ...prevState,
      [applicantId]: {
        ...prevState[applicantId],
        [actionType]: value,
      },
    }));
  };

  return (
    <div className="p-4 md:p-6 font-sans">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Job Applications
      </h2>

      {/* If no job is selected, show list of jobs */}
      {!selectedJob && (
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

      {/* If a job is selected, show applicants */}
      {selectedJob && (
        <div className="mt-6">
          <h3 className="text-center text-xl font-semibold mb-4">
            {selectedJob.title} - Candidates
          </h3>
          <button
            className="block mx-auto bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
            onClick={() => setSelectedJob(null)}
          >
            <ChevronLeft className="inline mr-1" size={18} /> Back to Jobs
          </button>

          {loading ? (
            <p className="text-center text-gray-600">Loading applications...</p>
          ) : jobApplicants.length === 0 ? (
            <p className="text-center text-gray-600">No applications found.</p>
          ) : (
            <div className="max-w-full overflow-x-auto shadow-md rounded-lg border bg-white">
              {/*
                Horizontal scroll container:
                - "overflow-x-auto" and "whitespace-nowrap" ensure columns are scrollable.
              */}
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 touch-auto">
                <table className="min-w-full table-auto whitespace-nowrap">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      {/*
                        Mark columns you want ALWAYS visible with no "hidden" classes.
                        Mark columns you want hidden on small screens with "hidden sm:table-cell".
                        Mark columns you want hidden on medium screens with "hidden md:table-cell", etc.
                      */}

                      {/* 1 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden sm:table-cell">
                        Company ID
                      </th>
                      {/* 2 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                        Application Status
                      </th>
                      {/* 3 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden sm:table-cell">
                        Application Date
                      </th>
                      {/* 4 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                        Name
                      </th>
                      {/* 5 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden sm:table-cell">
                        Date of Birth
                      </th>
                      {/* 6 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Father's Name
                      </th>
                      {/* 7 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Gender
                      </th>
                      {/* 8 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Marital Status
                      </th>
                      {/* 9 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Nationality
                      </th>
                      {/* 10 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden sm:table-cell">
                        Aadhaar Number
                      </th>
                      {/* 11 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                        Phone Number
                      </th>
                      {/* 12 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Alternate Number
                      </th>
                      {/* 13 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                        Email
                      </th>
                      {/* 14 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Height
                      </th>
                      {/* 15 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                        Job Title
                      </th>
                      {/* 16 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden sm:table-cell">
                        Location
                      </th>
                      {/* 17 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden sm:table-cell">
                        Experience
                      </th>
                      {/* 18 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        10th Board
                      </th>
                      {/* 19 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        10th Year
                      </th>
                      {/* 20 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        10th Percentage
                      </th>
                      {/* 21 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        12th Board
                      </th>
                      {/* 22 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        12th Year
                      </th>
                      {/* 23 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        12th Percentage
                      </th>
                      {/* 24 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Graduation Degree
                      </th>
                      {/* 25 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Graduation University
                      </th>
                      {/* 26 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Graduation Year
                      </th>
                      {/* 27 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Graduation CGPA
                      </th>
                      {/* 28 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Certifications
                      </th>
                      {/* 29 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Permanent Address
                      </th>
                      {/* 30 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Current Address
                      </th>
                      {/* 31 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Apprenticeship Company
                      </th>
                      {/* 32 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Apprenticeship Tenure
                      </th>
                      {/* 33 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Apprenticeship Salary
                      </th>
                      {/* 34 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Apprenticeship Location
                      </th>
                      {/* 35 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Work Company
                      </th>
                      {/* 36 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Work Tenure
                      </th>
                      {/* 37 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Work Salary
                      </th>
                      {/* 38 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Work Location
                      </th>
                      {/* 39 */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase hidden md:table-cell">
                        Job Role
                      </th>
                      {/* 40 - Actions */}
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobApplicants.map((app, index) => {
                      const data = app.applicationData?.applicationData || {};
                      const applicantId = app._id;

                      return (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          {/* 1. Company ID (hidden on < sm) */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            {data.companyId || "N/A"}
                          </td>

                          {/* 2. Application Status (always visible) */}
                          <td className="px-4 py-4">
                            {data.applicationStatus || "N/A"}
                          </td>

                          {/* 3. Application Date (hidden on < sm) */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            {data.applicationDate || "N/A"}
                          </td>

                          {/* 4. Name (always visible) */}
                          <td className="px-4 py-4">{data.name || "N/A"}</td>

                          {/* 5. Date of Birth (hidden on < sm) */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            {data.dateOfBirth || "N/A"}
                          </td>

                          {/* 6. Father's Name (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.fathersName || "N/A"}
                          </td>

                          {/* 7. Gender (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.gender || "N/A"}
                          </td>

                          {/* 8. Marital Status (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.maritalStatus || "N/A"}
                          </td>

                          {/* 9. Nationality (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.nationality || "N/A"}
                          </td>

                          {/* 10. Aadhaar Number (hidden on < sm) */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            {data.aadhaarNumber || "N/A"}
                          </td>

                          {/* 11. Phone Number (always visible) */}
                          <td className="px-4 py-4">
                            {data.phoneNumber || "N/A"}
                          </td>

                          {/* 12. Alternate Number (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.alternateNumber || "N/A"}
                          </td>

                          {/* 13. Email (always visible) */}
                          <td className="px-4 py-4">{data.email || "N/A"}</td>

                          {/* 14. Height (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.height || "N/A"}
                          </td>

                          {/* 15. Job Title (always visible) */}
                          <td className="px-4 py-4">
                            {data.jobTitle || "N/A"}
                          </td>

                          {/* 16. Location (hidden on < sm) */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            {data.location || "N/A"}
                          </td>

                          {/* 17. Experience (hidden on < sm) */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            {data.experience || "N/A"}
                          </td>

                          {/* 18. 10th Board (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.tenth?.board || "N/A"}
                          </td>

                          {/* 19. 10th Year (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.tenth?.year || "N/A"}
                          </td>

                          {/* 20. 10th Percentage (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.tenth?.percentage || "N/A"}
                          </td>

                          {/* 21. 12th Board (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.twelfth?.board || "N/A"}
                          </td>

                          {/* 22. 12th Year (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.twelfth?.year || "N/A"}
                          </td>

                          {/* 23. 12th Percentage (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.twelfth?.percentage || "N/A"}
                          </td>

                          {/* 24. Graduation Degree (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.graduation?.degree || "N/A"}
                          </td>

                          {/* 25. Graduation University (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.graduation?.university || "N/A"}
                          </td>

                          {/* 26. Graduation Year (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.graduation?.year || "N/A"}
                          </td>

                          {/* 27. Graduation CGPA (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.graduation?.cgpa || "N/A"}
                          </td>

                          {/* 28. Certifications (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.education?.graduation?.certifications?.join(
                              ", "
                            ) || "N/A"}
                          </td>

                          {/* 29. Permanent Address (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.address?.permanentAddress || "N/A"}
                          </td>

                          {/* 30. Current Address (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.address?.currentAddress || "N/A"}
                          </td>

                          {/* 31. Apprenticeship Company (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.apprenticeship?.companyName || "N/A"}
                          </td>

                          {/* 32. Apprenticeship Tenure (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.apprenticeship?.tenure || "N/A"}
                          </td>

                          {/* 33. Apprenticeship Salary (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.apprenticeship?.salary || "N/A"}
                          </td>

                          {/* 34. Apprenticeship Location (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.apprenticeship?.location || "N/A"}
                          </td>

                          {/* 35. Work Company (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.workExperience?.companyName || "N/A"}
                          </td>

                          {/* 36. Work Tenure (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.workExperience?.tenure || "N/A"}
                          </td>

                          {/* 37. Work Salary (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.workExperience?.salary || "N/A"}
                          </td>

                          {/* 38. Work Location (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.workExperience?.location || "N/A"}
                          </td>

                          {/* 39. Job Role (hidden on < md) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            {data.workExperience?.jobRole || "N/A"}
                          </td>

                          {/* 40. Actions (always visible) */}
                          <td className="px-4 py-4">
                            <div className="flex flex-col space-y-2">
                              {/* Interview Status */}
                              <div className="flex space-x-2">
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.interviewStatus === "Interviewed"
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "interviewStatus",
                                      "Interviewed"
                                    )
                                  }
                                >
                                  Interviewed
                                </button>
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.interviewStatus === "Not Interviewed"
                                      ? "bg-red-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "interviewStatus",
                                      "Not Interviewed"
                                    )
                                  }
                                >
                                  Not Interviewed
                                </button>
                              </div>

                              {/* Onboard Status */}
                              <div className="flex space-x-2">
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.onboardStatus === "Onboarded"
                                      ? "bg-blue-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "onboardStatus",
                                      "Onboarded"
                                    )
                                  }
                                >
                                  Onboarded
                                </button>
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.onboardStatus === "Boarded"
                                      ? "bg-yellow-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "onboardStatus",
                                      "Boarded"
                                    )
                                  }
                                >
                                  Boarded
                                </button>
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.onboardStatus === "Not Yet"
                                      ? "bg-gray-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "onboardStatus",
                                      "Not Yet"
                                    )
                                  }
                                >
                                  Not Yet
                                </button>
                              </div>

                              {/* Accept/Reject Status */}
                              <div className="flex space-x-2">
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.acceptRejectStatus === "Accepted"
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "acceptRejectStatus",
                                      "Accepted"
                                    )
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  className={`px-3 py-1 text-xs rounded-md ${
                                    applicationStatus[applicantId]
                                      ?.acceptRejectStatus === "Rejected"
                                      ? "bg-red-500"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleActionClick(
                                      applicantId,
                                      "acceptRejectStatus",
                                      "Rejected"
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
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
      )}
    </div>
  );
};

export default ViewApplications;

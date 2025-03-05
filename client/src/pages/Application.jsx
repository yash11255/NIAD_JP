import React, { useContext, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import moment from "moment";

const Application = () => {
  // Resume update & toggle state
  const [isEdit, setIsEdit] = useState(false);
  // Store the resume file (not just the name)
  const [resume, setResume] = useState(null);
  const [lookingForJob, setLookingForJob] = useState(false);

  // Get the updateUserResume function and user applications from context
  const { userData, updateUserResume, userApplications } =
    useContext(AppContext);

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file); // Store the actual file object
    }
  };

  const handleSave = async () => {
    if (resume) {
      // Call the API to update resume (uploading to Cloudinary via your backend)
      await updateUserResume(resume);
      setIsEdit(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-10 lg:px-20 my-10 min-h-[70vh]">
        {/* Resume & Job Search Toggle Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Resume Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Resume
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Upload and manage your resume for job applications.
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
                {isEdit ? (
                  <>
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
                    >
                      <FaUpload className="text-lg" /> Select Resume
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                    {resume && (
                      <p className="text-gray-700 text-sm truncate w-48">
                        {resume.name}
                      </p>
                    )}
                    {resume && (
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    {userData && userData.resume ? (
                      <a
                        href={userData.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
                      >
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-500">No resume uploaded</p>
                    )}
                    <button
                      onClick={() => setIsEdit(true)}
                      className="text-gray-600 border border-gray-300 rounded-md px-4 py-2 font-medium shadow-md hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Looking for Job Toggle */}
            <div className="flex items-center gap-3 mt-6 md:mt-0">
              <p className="text-gray-700 font-medium">Looking for a Job?</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={lookingForJob}
                  onChange={() => setLookingForJob(!lookingForJob)}
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
              </label>
              <span
                className={`text-sm font-medium ${
                  lookingForJob ? "text-green-600" : "text-gray-500"
                }`}
              >
                {lookingForJob ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Jobs Applied Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Jobs Applied
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Track the jobs you have applied for.
          </p>
          <div className="overflow-x-auto">
            {userApplications && userApplications.length > 0 ? (
              <table className="w-full border-collapse rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-800 text-sm">
                    <th className="p-4 text-left">Company</th>
                    <th className="p-4 text-left">Job Title</th>
                    <th className="p-4 text-left">Location</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userApplications.map((app, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-50 transition text-sm`}
                    >
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={app.companyId.image}
                          alt="Company Logo"
                          className="h-10 w-10 rounded-md shadow-sm"
                        />
                        <span className="font-medium text-gray-800">
                          {app.companyId.name}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">{app.jobId.title}</td>
                      <td className="p-4 text-gray-700">
                        {app.jobId.location}
                      </td>
                      <td className="p-4 text-gray-500">
                        {moment(app.jobId.date).format("ll")}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-medium ${
                            app.status === "Accepted"
                              ? "bg-green-500 text-white"
                              : app.status === "Rejected"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-600">
                No applications found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;

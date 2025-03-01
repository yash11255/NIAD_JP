import React, { useState } from "react";
import { FaUpload } from "react-icons/fa"; // Upload Icon
import Navbar from "../Components/Navbar";
import { jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../Components/Footer";

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file.name); // Save the file name
    }
  };

  const handleSave = () => {
    if (resume) {
      setIsEdit(false); // Exit edit mode after saving
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-10 lg:px-20 my-10 min-h-[70vh]">
        {/* Resume Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Your Resume</h2>
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
                    {resume}
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
                {resume ? (
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
                  >
                    {resume}
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

        {/* Jobs Applied Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Jobs Applied
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Track the jobs you have applied for.
          </p>

          <div className="overflow-x-auto">
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
                {jobsApplied.map((job, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-50 transition text-sm`}
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={job.logo}
                        alt="Company Logo"
                        className="h-10 w-10 rounded-md shadow-sm"
                      />
                      <span className="font-medium text-gray-800">
                        {job.company}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">{job.title}</td>
                    <td className="p-4 text-gray-700">{job.location}</td>
                    <td className="p-4 text-gray-500">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="p-4">
                      {/* Status with dynamic color */}
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          job.status === "Accepted"
                            ? "bg-green-500 text-white" // Accepted -> Green
                            : job.status === "Rejected"
                            ? "bg-red-500 text-white" // Rejected -> Red
                            : "bg-yellow-500 text-white" // Pending -> Yellow
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;
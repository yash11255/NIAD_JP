import React, { useState } from "react";
import { manageJobsData } from "../assets/assets";
import { Eye, EyeOff, Users, Briefcase } from "lucide-react";

const ManageJobs = () => {
  const [jobs, setJobs] = useState(manageJobsData);

  // Function to toggle job visibility
  const toggleVisibility = (id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === id ? { ...job, visible: !job.visible } : job
      )
    );
  };

  // Stats Calculation
  const totalJobs = jobs.length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
  const visibleJobs = jobs.filter((job) => job.visible).length;
  const hiddenJobs = totalJobs - visibleJobs;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* 🚀 Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Job Openings</h3>
            <p className="text-3xl font-bold text-blue-600">{totalJobs}</p>
          </div>
          <Briefcase className="h-10 w-10 text-gray-500" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Applicants</h3>
            <p className="text-3xl font-bold text-green-600">{totalApplicants}</p>
          </div>
          <Users className="h-10 w-10 text-gray-500" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Visible / Hidden Jobs</h3>
            <p className="text-3xl font-bold text-orange-600">{visibleJobs} / {hiddenJobs}</p>
          </div>
          <Eye className="h-10 w-10 text-gray-500" />
        </div>
      </div>

      {/* 📋 Job Listings Table */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
              <th className="px-5 py-4 text-left">Job ID</th>
              <th className="px-5 py-4 text-left">Job Title</th>
              <th className="px-5 py-4 text-left">Date Posted</th>
              <th className="px-5 py-4 text-center">Applicants</th>
              <th className="px-5 py-4 text-center">Visibility</th>
              <th className="px-5 py-4 text-left">Location</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="px-5 py-4 text-gray-700">{job._id}</td>
                <td className="px-5 py-4 font-medium text-gray-900">{job.title}</td>
                <td className="px-5 py-4 text-gray-600">
                  {new Date(job.date).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-center font-semibold text-blue-600">{job.applicants}</td>
                <td className="px-5 py-4 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.visible ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {job.visible ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700">{job.location}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => toggleVisibility(job._id)}
                    className="px-3 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-md flex items-center gap-1"
                  >
                    {job.visible ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;
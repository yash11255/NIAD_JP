"use client"

import { useContext, useState } from "react"
import { ChevronLeft, Briefcase, User, GraduationCap, MapPin, Building, Clock } from "lucide-react"
import { AppContext } from "../context/AppContext"



/**
 * Helper to get a Tailwind color class for a given status.
 * Customize as you see fit (e.g., "Onboarded", "Interviewed").
 */
function getStatusBadgeColor(status) {
  switch (status) {
    case "Accepted":
      return "bg-green-500 text-white"
    case "Rejected":
      return "bg-red-500 text-white"
    case "Onboarded":
      return "bg-blue-500 text-white"
    case "Interviewed":
      return "bg-yellow-500 text-white"
    default:
      return "bg-gray-300 text-gray-800"
  }
}

const ViewApplications = () => {
  const { jobs, jobApplicants, fetchJobApplicants } = useContext(AppContext)
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")


  

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const applicantsPerPage = 2 // Adjust as desired

  // When a job is selected, fetch its applicants
  const handleJobClick = async (job) => {
    setSelectedJob(job)
    setLoading(true)
    await fetchJobApplicants(job._id)
    setLoading(false)
    setCurrentPage(1) // reset to first page whenever a new job is selected
  }

  // If job not selected, show job list
  if (!selectedJob) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl font-sans">
        <h2 className="text-3xl font-bold mb-8 text-center">Job Applications</h2>
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
    )
  }

  // Show loading or no applicants
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
    )
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
            <p className="text-gray-500">There are currently no applications for this position.</p>
          </div>
        </div>
      </div>
    )
  }

  // Pagination logic
  const totalApplicants = jobApplicants.length
  const totalPages = Math.ceil(totalApplicants / applicantsPerPage)

  const startIndex = (currentPage - 1) * applicantsPerPage
  const endIndex = startIndex + applicantsPerPage
  const currentApplicants = jobApplicants.slice(startIndex, endIndex)

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

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
          Showing {startIndex + 1}-{Math.min(endIndex, totalApplicants)} of {totalApplicants} candidates
        </p>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Applicant Cards */}
      <div className="space-y-6">
        {currentApplicants.map((app, index) => {
          // 'app' is a single applicant record
          const data = app || {}
          // If your API returns something like { status: "Accepted" }, show it:
          const badgeColor = getStatusBadgeColor(data.status)
          const applicantName = data.userId?.name || "N/A"
          const initials =
            applicantName !== "N/A"
              ? applicantName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
              : "NA"

          return (
            <div key={data._id || index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 pb-4">
                {/* Status Labels on Top */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Interview Status */}
                  <span
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${data.interview === "Interviewed" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {data.interview || "Not Interviewed"}
                  </span>

                  {/* Onboarding Status */}
                  <span
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${data.onboarding === "Onboarded" ? "bg-purple-100 text-purple-700" : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {data.onboarding || "Not Onboarded"}
                  </span>

                  {/* Accept/Reject Status */}
                  <span
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${data.decision === "Accepted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                  >
                    {data.decision || "Pending"}
                  </span>
                </div>

                {/* Applicant Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{applicantName}</h3>
                      <p className="text-sm text-gray-500">{data.email || "No email provided"}</p>
                    </div>
                  </div>
                </div>

                {/* Toggle Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {/* Interview Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          interview: prev.interview === "Interviewed" ? "Not Interviewed" : "Interviewed",
                        }))
                      }
                      className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300"
                    >
                      Toggle Interview
                    </button>
                  </div>

                  {/* Onboarding Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          onboarding: prev.onboarding === "Onboarded" ? "Not Onboarded" : "Onboarded",
                        }))
                      }
                      className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300"
                    >
                      Toggle Onboarding
                    </button>
                  </div>

                  {/* Accept/Reject Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          decision: prev.decision === "Accepted" ? "Rejected" : "Accepted",
                        }))
                      }
                      className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300"
                    >
                      Toggle Accept/Reject
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`px-4 py-2 font-medium text-sm ${activeTab === "personal"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab("education")}
                    className={`px-4 py-2 font-medium text-sm ${activeTab === "education"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`px-4 py-2 font-medium text-sm ${activeTab === "experience"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab("address")}
                    className={`px-4 py-2 font-medium text-sm ${activeTab === "address"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Address
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Personal Info Tab */}
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{data.dateOfBirth || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Father's Name</p>
                      <p className="font-medium">{data.fathersName || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{data.gender || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Marital Status</p>
                      <p className="font-medium">{data.maritalStatus || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="font-medium">{data.nationality || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Aadhaar</p>
                      <p className="font-medium">{data.aadhaarNumber || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{data.phoneNumber || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Alternate Phone</p>
                      <p className="font-medium">{data.altNumber || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="font-medium">{data.height || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="font-medium">{data.jobTitle || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{data.location || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{data.experience || "N/A"}</p>
                    </div>
                  </div>
                )}

                {/* Education Tab */}
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
                            <p className="font-medium">{data.education?.tenth?.board || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">{data.education?.tenth?.year || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Percentage</p>
                            <p className="font-medium">{data.education?.tenth?.percentage || "N/A"}</p>
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
                            <p className="font-medium">{data.education?.twelfth?.board || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">{data.education?.twelfth?.year || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Percentage</p>
                            <p className="font-medium">{data.education?.twelfth?.percentage || "N/A"}</p>
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
                            <p className="font-medium">{data.education?.graduation?.degree || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">University</p>
                            <p className="font-medium">{data.education?.graduation?.university || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">{data.education?.graduation?.yearOfGraduation || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">CGPA</p>
                            <p className="font-medium">{data.education?.graduation?.cgpa || "N/A"}</p>
                          </div>
                        </div>

                        {data.education?.graduation?.certifications?.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm text-gray-500 mb-2">Certifications</p>
                            <div className="flex flex-wrap gap-2">
                              {data.education.graduation.certifications.map((cert, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
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
                            <p className="font-medium">{data.apprenticeship?.companyName || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Tenure</p>
                            <p className="font-medium">{data.apprenticeship?.tenure || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Salary</p>
                            <p className="font-medium">{data.apprenticeship?.salaryStipend || "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{data.apprenticeship?.location || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Work Experience
                      </h3>

                      {data.workExperiences?.length ? (
                        <div className="space-y-4">
                          {data.workExperiences.map((exp, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Company</p>
                                  <p className="font-medium">{exp.companyName || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Job Role</p>
                                  <p className="font-medium">{exp.jobRole || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Tenure</p>
                                  <p className="font-medium">{exp.tenure || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Salary</p>
                                  <p className="font-medium">{exp.salaryStipend || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Location</p>
                                  <p className="font-medium">{exp.location || "N/A"}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="text-gray-500">No work experience</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Address Tab */}
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
                        <p>{data.address?.permanentAddress || "N/A"}</p>
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
                        <p>{data.address?.currentAddress || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination Controls */}
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
                className={`w-8 h-8 rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
  )
}

export default ViewApplications


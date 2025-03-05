import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {
  Briefcase,
  Building2,
  User,
  DollarSign,
  MapPin,
  GraduationCap,
} from "lucide-react";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");

  const [hrName, setHrName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrPhone, setHrPhone] = useState("");

  const [activeSection, setActiveSection] = useState("job");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { postJob } = useContext(AppContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!quillRef.current) return;

    const description = quillRef.current.root.innerHTML;

    if (
      !title ||
      !description ||
      !location ||
      !category ||
      !level ||
      !salary ||
      !companyName
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    //Do not change this any change in this form will disrupt the whole form
    const jobData = {
      title,
      description,
      location,
      salary,
      category,
      level,
      companyDetails: {
        name: companyName || "",
        shortDescription: companyDesc || "",
        city: companyCity || "",
        state: companyState || "",
        country: companyCountry || "",
        hrName: hrName || "",
        hrEmail: hrEmail || "",
        hrPhone: hrPhone || "",
      },
    };

    postJob(jobData);

    setTitle("");
    setSalary(0);
    setCompanyName("");
    setCompanyDesc("");
    setCompanyCity("");
    setCompanyState("");
    setCompanyCountry("");
    setHrName("");
    setHrEmail("");
    setHrPhone("");
    quillRef.current.root.innerHTML = "";
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write detailed job description here...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Post a New Job Opportunity
            </h2>
            <p className="text-blue-100 mt-1">
              Fill in the details to create your job listing
            </p>
          </div>

          {/* Progress Tabs */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="flex space-x-1 sm:space-x-4">
              <button
                onClick={() => setActiveSection("job")}
                className={`px-3 py-2 text-sm sm:text-base font-medium rounded-t-lg flex items-center ${
                  activeSection === "job"
                    ? "bg-white text-blue-700 border-t border-l border-r border-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Briefcase className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Job Details</span>
                <span className="sm:hidden">Job</span>
              </button>
              <button
                onClick={() => setActiveSection("company")}
                className={`px-3 py-2 text-sm sm:text-base font-medium rounded-t-lg flex items-center ${
                  activeSection === "company"
                    ? "bg-white text-blue-700 border-t border-l border-r border-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Building2 className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Company Info</span>
                <span className="sm:hidden">Company</span>
              </button>
              <button
                onClick={() => setActiveSection("contact")}
                className={`px-3 py-2 text-sm sm:text-base font-medium rounded-t-lg flex items-center ${
                  activeSection === "contact"
                    ? "bg-white text-blue-700 border-t border-l border-r border-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <User className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Contact Person</span>
                <span className="sm:hidden">Contact</span>
              </button>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="p-6">
            {/* Job Details Section */}
            {activeSection === "job" && (
              <div className="space-y-6">
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Senior Frontend Developer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <div
                    ref={editorRef}
                    className="border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
                  ></div>
                  <p className="mt-1 text-sm text-gray-500">
                    Include responsibilities, requirements, benefits, and
                    company culture
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Job Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {JobCategories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Job Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        {JobLocations.map((loc, index) => (
                          <option key={index} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Experience Level <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GraduationCap className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                      >
                        <option value="Beginner level">Entry Level</option>
                        <option value="Intermediate level">Mid-Level</option>
                        <option value="Senior level">Senior Level</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Salary (Annual) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 75000"
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the annual salary in USD
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveSection("company")}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Next: Company Info
                  </button>
                </div>
              </div>
            )}

            {/* Company Details Section */}
            {activeSection === "company" && (
              <div className="space-y-6">
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Company Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe the company, culture, and mission..."
                    value={companyDesc}
                    onChange={(e) => setCompanyDesc(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      value={companyCity}
                      onChange={(e) => setCompanyCity(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      placeholder="State/Province"
                      value={companyState}
                      onChange={(e) => setCompanyState(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={companyCountry}
                      onChange={(e) => setCompanyCountry(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveSection("job")}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection("contact")}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Next: Contact Info
                  </button>
                </div>
              </div>
            )}

            {/* Contact Person Section */}
            {activeSection === "contact" && (
              <div className="space-y-6">
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    HR/Contact Person Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={hrName}
                    onChange={(e) => setHrName(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      value={hrEmail}
                      onChange={(e) => setHrEmail(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (123) 456-7890"
                      value={hrPhone}
                      onChange={(e) => setHrPhone(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
                  <h4 className="text-blue-800 font-medium mb-2">
                    Ready to post?
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Please review all information before submitting. Fields
                    marked with <span className="text-red-500">*</span> are
                    required.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveSection("company")}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Post Job
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Navbar from "../Components/Navbar";

const ApplyJobForm = ({ jobTitle, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Existing fields
    name: "",
    dateOfBirth: "",
    fathersName: "",
    jobTitle: jobTitle,
    location: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    aadhaarNumber: "",
    altNumber: "",
    height: 0,
    phoneNumber: "",
    email: "",
    experience: 0,

    // Education
    education: {
      tenth: {
        board: "",
        year: 0,
        percentage: 0,
      },
      twelfth: {
        board: "",
        year: 0,
        percentage: 0,
      },
      graduation: {
        degree: "",
        university: "",
        yearOfGraduation: 0,
        cgpa: 0,
      },
      certifications: [""],
    },

    // Address
    permanentAddress: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    currentAddress: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    sameAsPermAddress: false,

    // NEW: Apprenticeship
    apprenticeship: {
      hasApprenticeship: "No", // "Yes" or "No"
      companyName: "",
      tenure: "",
      salaryStipend: "",
      location: "",
    },

    // NEW: Work Experiences (array to hold multiple experiences)
    workExperiences: [
      {
        companyName: "",
        tenure: "",
        salaryStipend: "",
        location: "",
        jobRole: "",
      },
    ],
  });

  const [certificationInput, setCertificationInput] = useState("");

  // Handle general changes for top-level keys or nested (like permanentAddress)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If "section.field" => handle nested
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle changes for education fields
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    const [level, field] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          [field]:
            field === "year" ||
            field === "percentage" ||
            field === "yearOfGraduation" ||
            field === "cgpa"
              ? parseFloat(value)
              : value,
        },
      },
    }));
  };

  // Handle changes for addresses
  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
    }));
  };

  // Handle checkbox for same as permanent address
  const handleSameAddressChange = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsPermAddress: checked,
      currentAddress: checked
        ? { ...prev.permanentAddress }
        : prev.currentAddress,
    }));
  };

  // Handle certification array
  const handleAddCertification = () => {
    if (certificationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          certifications: [
            ...prev.education.certifications,
            certificationInput.trim(),
          ],
        },
      }));
      setCertificationInput("");
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        certifications: prev.education.certifications.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // NEW: Handle apprenticeship changes
  const handleApprenticeshipChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      apprenticeship: {
        ...prev.apprenticeship,
        [name]: value,
      },
    }));
  };

  // NEW: Work Experience handlers
  const handleWorkExperienceChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedExperiences = [...prev.workExperiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [name]: value,
      };
      return {
        ...prev,
        workExperiences: updatedExperiences,
      };
    });
  };

  const handleAddWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          companyName: "",
          tenure: "",
          salaryStipend: "",
          location: "",
          jobRole: "",
        },
      ],
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onCancel}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft size={20} />
            <span>Back to Job Details</span>
          </button>
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Apply for {jobTitle}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Father's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name *
                </label>
                <input
                  type="text"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Alternative Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alternative Number
                </label>
                <input
                  type="tel"
                  name="altNumber"
                  value={formData.altNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Aadhaar Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (in cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Current Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Education
            </h3>

            {/* 10th Standard */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">10th Standard</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Board
                  </label>
                  <input
                    type="text"
                    name="tenth.board"
                    value={formData.education.tenth.board}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="tenth.year"
                    value={formData.education.tenth.year || ""}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage
                  </label>
                  <input
                    type="number"
                    name="tenth.percentage"
                    value={formData.education.tenth.percentage || ""}
                    onChange={handleEducationChange}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 12th Standard */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">12th Standard</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Board
                  </label>
                  <input
                    type="text"
                    name="twelfth.board"
                    value={formData.education.twelfth.board}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="twelfth.year"
                    value={formData.education.twelfth.year || ""}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage
                  </label>
                  <input
                    type="number"
                    name="twelfth.percentage"
                    value={formData.education.twelfth.percentage || ""}
                    onChange={handleEducationChange}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Graduation */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Graduation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    name="graduation.degree"
                    value={formData.education.graduation.degree}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <input
                    type="text"
                    name="graduation.university"
                    value={formData.education.graduation.university}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Graduation
                  </label>
                  <input
                    type="number"
                    name="graduation.yearOfGraduation"
                    value={formData.education.graduation.yearOfGraduation || ""}
                    onChange={handleEducationChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CGPA
                  </label>
                  <input
                    type="number"
                    name="graduation.cgpa"
                    value={formData.education.graduation.cgpa || ""}
                    onChange={handleEducationChange}
                    step="0.01"
                    min="0"
                    max="10"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Certifications</h4>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={certificationInput}
                  onChange={(e) => setCertificationInput(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a certification"
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              {formData.education.certifications.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Added Certifications:
                  </p>
                  <ul className="space-y-1">
                    {formData.education.certifications.map((cert, index) =>
                      cert ? (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded"
                        >
                          <span>{cert}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCertification(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Address Information
            </h3>

            {/* Permanent Address */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Permanent Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.permanentAddress.street}
                    onChange={(e) => handleAddressChange(e, "permanentAddress")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.permanentAddress.city}
                    onChange={(e) => handleAddressChange(e, "permanentAddress")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.permanentAddress.state}
                    onChange={(e) => handleAddressChange(e, "permanentAddress")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.permanentAddress.pincode}
                    onChange={(e) => handleAddressChange(e, "permanentAddress")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Current Address */}
            <div>
              <div className="flex items-center mb-2">
                <h4 className="font-medium text-gray-700">Current Address</h4>
                <div className="ml-4 flex items-center">
                  <input
                    type="checkbox"
                    id="sameAsPermAddress"
                    checked={formData.sameAsPermAddress}
                    onChange={handleSameAddressChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="sameAsPermAddress"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Same as Permanent Address
                  </label>
                </div>
              </div>

              {!formData.sameAsPermAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.currentAddress.street}
                      onChange={(e) => handleAddressChange(e, "currentAddress")}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.currentAddress.city}
                      onChange={(e) => handleAddressChange(e, "currentAddress")}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleAddressChange(e, "currentAddress")}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.currentAddress.pincode}
                      onChange={(e) => handleAddressChange(e, "currentAddress")}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* NEW SECTION: Apprenticeship */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Apprenticeship
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Yes/No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Have you done an Apprenticeship?
                </label>
                <select
                  name="hasApprenticeship"
                  value={formData.apprenticeship.hasApprenticeship}
                  onChange={handleApprenticeshipChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* Show apprenticeship fields only if "Yes" */}
              {formData.apprenticeship.hasApprenticeship === "Yes" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.apprenticeship.companyName}
                      onChange={handleApprenticeshipChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tenure (in years)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="tenure"
                      value={formData.apprenticeship.tenure}
                      onChange={handleApprenticeshipChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary / Stipend
                    </label>
                    <input
                      type="text"
                      name="salaryStipend"
                      value={formData.apprenticeship.salaryStipend}
                      onChange={handleApprenticeshipChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.apprenticeship.location}
                      onChange={handleApprenticeshipChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* NEW SECTION: Work Experience */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Work Experience
            </h3>
            {formData.workExperiences.map((exp, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-md mb-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={exp.companyName}
                      onChange={(e) => handleWorkExperienceChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {/* Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tenure (in years)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="tenure"
                      value={exp.tenure}
                      onChange={(e) => handleWorkExperienceChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {/* Salary / Stipend */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary / Stipend
                    </label>
                    <input
                      type="text"
                      name="salaryStipend"
                      value={exp.salaryStipend}
                      onChange={(e) => handleWorkExperienceChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={exp.location}
                      onChange={(e) => handleWorkExperienceChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {/* Job Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Role
                    </label>
                    <input
                      type="text"
                      name="jobRole"
                      value={exp.jobRole}
                      onChange={(e) => handleWorkExperienceChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Remove this Work Experience */}
                {index > 0 && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleRemoveWorkExperience(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove This Work Experience
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddWorkExperience}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Work Experience
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyJobForm;

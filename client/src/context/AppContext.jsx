import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import Cookies from "js-cookie";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobApplicants, setJobApplicants] = useState([]);
  const [jobAppData, setJobAppData] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // console.log("--->", isAuthenticated);

  // user states
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  // console.log("applications", userApplications);
  // console.log("appcontext user auth", isUserAuthenticated);

  const backendUrl =
    import.meta.env?.VITE_BACKEND_URL || "https://bito-jobs-server.vercel.app";

  //central authentication check for company
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/company`, {
          withCredentials: true,
        });
        // console.log("check comp auth");

        if (data.success) {
          setCompanyData(data.company);
          setIsAuthenticated(true);
          fetchCompanyJobs();
        } else {
          setIsAuthenticated(false);
          setCompanyData(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setCompanyData(null);
        // console.error("Authentication check failed:", error);
      }
    };

    checkAuthStatus();
  }, []);

  //central authentication check for user
  useEffect(() => {
    const checkUserAuthStatus = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/user`, {
          withCredentials: true,
        });
        // console.log("user auth api");

        if (data.success) {
          setUserData(data.user);
          setIsUserAuthenticated(true);
        } else {
          setIsUserAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        setIsUserAuthenticated(false);
        setUserData(null);
        console.error("User authentication check failed:", error);
      }
    };

    checkUserAuthStatus();
  }, []);

  //Post Job Function
  const postJob = async (jobData) => {
    if (!isAuthenticated || !companyData) {
      alert("You need to be logged in to post a job.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/company/post-job`,
        jobData,
        { withCredentials: true }
      );
      console.log("Job added", response);
      if (response.data.success) {
        alert("Job posted successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  //Fetch Company Jobs
  const fetchCompanyJobs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        withCredentials: true,
      });
      console.log("this is job listing", response);

      if (response.data.success) {
        setJobs(response.data.jobsData);
      } else {
        // console.error("Failed to fetch jobs:", response.data.message);
      }
    } catch (error) {
      // console.error("Error fetching company jobs:", error);
    }
  };

  // Fetch job applicants for a selected job
  const fetchJobApplicants = async (jobId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/company/applicants/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log("applicants", response.data);

      if (response.data.success) {
        setJobApplicants(response.data.applications);
        setJobAppData(response.data);
        setSelectedJobId(jobId);
      } else {
        // console.error("Failed to fetch applicants:", response.data.message);
      }
    } catch (error) {
      // console.error("Error fetching job applicants:", error);
    }
  };

  //user centric job applications
  const fetchUserJobApplications = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/applications`, {
        withCredentials: true,
      });
      console.log("user jobs applied", response);
      if (response.data.success) {
        setUserApplications(response.data.applications);
      } else {
        console.error(
          "Failed to fetch job applications:",
          response.data.message
        );
        setUserApplications([]);
      }
    } catch (error) {
      console.error("Error fetching user job applications:", error);
      setUserApplications([]);
    }
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      fetchUserJobApplications();
    }
  }, [isUserAuthenticated]);

  // NEW: Update User Resume API
  const updateUserResume = async (resumeFile) => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      const response = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        alert("Resume Updated Successfully");
        // Update userData with the new resume URL
        setUserData((prev) => ({
          ...prev,
          resume: response.data.resumeUrl, // assuming your API returns the new URL as resumeUrl
        }));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Error updating resume. Please try again.");
    }
  };

  const applyForJob = async (jobId, applicationData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/apply/${jobId}`,
        applicationData,
        {
          withCredentials: true,
        }
      );
      return response.data; // Expected to contain { success, message }
    } catch (error) {
      console.error("Error applying for job:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      };
    }
  };

  //logout company fucntionality
  const logout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/company/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }

    Cookies.remove("token");
    localStorage.removeItem("token");
    setCompanyData(null);
    setIsAuthenticated(false);
  };
  const userlogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/users/user-logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }

    Cookies.remove("token");
    localStorage.removeItem("token");
    setUserData(null);
    setIsUserAuthenticated(false);
  };

  //update application status (Accepted/Rejected)
  const changeJobApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id: applicationId, status: newStatus },
        { withCredentials: true }
      );
      if (response.data.success) {
        setJobApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      return { success: false, message: error.message };
    }
  };

  // changing Interview status
  const changeInterviewStatus = async (applicationId, newInterviewStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/company/change-int`,
        { id: applicationId, interviewStatus: newInterviewStatus },
        { withCredentials: true }
      );
      if (response.data.success) {
        setJobApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId
              ? { ...app, interview: newInterviewStatus }
              : app
          )
        );
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating interview status:", error);
      return { success: false, message: error.message };
    }
  };

  //  changing Onboarding status
  const changeOnboardingStatus = async (applicationId, newOnboardingStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/company/change-onboard`,
        { id: applicationId, onboardingStatus: newOnboardingStatus },
        { withCredentials: true }
      );
      if (response.data.success) {
        setJobApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId
              ? { ...app, onboarding: newOnboardingStatus }
              : app
          )
        );
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating onboarding status:", error);
      return { success: false, message: error.message };
    }
  };

  // universal job and companies fetch fucntion
  useEffect(() => {
    const fetchCompaniesWithJobs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/jnc`, {
          // withCredentials: true,
        });
        // this data is an array which will have the jobs and companies
        let jobsFromAPI = [];
        data.forEach((companyObj) => {
          if (companyObj.jobs && companyObj.jobs.length > 0) {
            companyObj.jobs.forEach((job) => {
              job.companyId = companyObj.company;
              jobsFromAPI.push(job);
            });
          }
        });
        setJobs(jobsFromAPI);
      } catch (error) {
        console.error("Error fetching companies with jobs:", error);
      }
    };

    if (isUserAuthenticated) {
      // When user is logged in, fetch from the API.
      fetchCompaniesWithJobs();
    } else {
      // Otherwise, use sample jobs from assets.js and apply search filters.
      let filteredJobs = jobsData;
      if (searchFilter.title) {
        filteredJobs = filteredJobs.filter((job) =>
          job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        );
      }
      if (searchFilter.location) {
        filteredJobs = filteredJobs.filter((job) =>
          job.location
            .toLowerCase()
            .includes(searchFilter.location.toLowerCase())
        );
      }
      setJobs(filteredJobs);
    }
  }, [searchFilter, isUserAuthenticated, backendUrl]);

  useEffect(() => {
    fetchCompanyJobs(); // Fetch jobs when component mounts
  }, []);
  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    setCompanyData,
    isAuthenticated,
    setIsAuthenticated,
    companyData,
    showRecruiterLogin,
    setShowRecruiterLogin,
    logout,
    userlogout,
    postJob,
    fetchCompanyJobs,
    fetchJobApplicants,
    jobApplicants,
    setJobApplicants,
    selectedJobId,
    setSelectedJobId,
    showUserLogin,
    setShowUserLogin,
    userData,
    setUserData,
    isUserAuthenticated,
    setIsUserAuthenticated,
    userApplications,
    setUserApplications,
    fetchUserJobApplications,
    updateUserResume,
    applyForJob,
    jobAppData,
    setJobAppData,
    changeJobApplicationStatus,
    changeInterviewStatus,
    changeOnboardingStatus,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

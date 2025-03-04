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
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log("--->", isAuthenticated);

  const backendUrl =
    import.meta.env?.VITE_BACKEND_URL || "http://localhost:5001";

  //central authentication check for company
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/company`, {
          withCredentials: true,
        });

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
        console.error("Authentication check failed:", error);
      }
    };

    checkAuthStatus();
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
        console.error("Failed to fetch jobs:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching company jobs:", error);
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
      console.log("applicants,", response);

      if (response.data.success) {
        setJobApplicants(response.data.applications);
        setSelectedJobId(jobId);
      } else {
        console.error("Failed to fetch applicants:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching job applicants:", error);
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
    postJob,
    fetchCompanyJobs,
    fetchJobApplicants,
    jobApplicants,
    setJobApplicants,
    selectedJobId,
    setSelectedJobId,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

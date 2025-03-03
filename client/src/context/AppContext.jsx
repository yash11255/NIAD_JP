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
    const fetchJobs = () => {
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
    };

    fetchJobs();
  }, [searchFilter]);

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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

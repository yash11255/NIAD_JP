import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import Cookies from "js-cookie"; // ✅ Import js-cookie

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
  const [companyToken, setCompanyTokenState] = useState(Cookies.get("companyToken") || null); // ✅ Read token from cookies

  // ✅ Store token in both state and cookies
  const setCompanyToken = (token) => {
    setCompanyTokenState(token);
    if (token) {
      Cookies.set("companyToken", token, { expires: 7 }); // Store for 7 days
    } else {
      Cookies.remove("companyToken");
    }
  };

  console.log("this is comp token", companyToken);

  // ✅ Fetch & filter job data
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
          job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
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
    companyData,
    companyToken,
    setCompanyToken, // ✅ Updated function
    showRecruiterLogin,
    setShowRecruiterLogin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
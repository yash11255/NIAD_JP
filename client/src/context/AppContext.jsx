import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const[showRecruiterLogin,setShowRecruiterLogin] = useState(false)

  // Function to fetch and filter job data
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
  }, [searchFilter]); // Re-run filtering when searchFilter changes

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs, // Use jobs instead of jobsData
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations, assets } from "../assets/assets";
import Jobcard from "./Jobcard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  
  // Filters State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Pagination States
  const jobsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Function to handle location selection
  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  // **Filtering Jobs Based on Search, Category & Location**
  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = searchFilter.title ? job.title.toLowerCase().includes(searchFilter.title.toLowerCase()) : true;
    const matchesLocation = searchFilter.location ? job.location.toLowerCase().includes(searchFilter.location.toLowerCase()) : true;
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(job.category) : true;
    const matchesSelectedLocation = selectedLocations.length > 0 ? selectedLocations.includes(job.location) : true;
    
    return matchesTitle && matchesLocation && matchesCategory && matchesSelectedLocation;
  });

  // **Pagination Logic**
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Reset Pagination when Filters Change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLocations, searchFilter]);

  // Pagination Handlers
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar for filtering job listings */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        <h3 className="font-medium text-lg mb-4">Current Search</h3>

        {/* Display search filters if applied */}
        {isSearched && (searchFilter.title || searchFilter.location) ? (
          <div className="mb-4 text-gray-600">
            {searchFilter.title && (
              <span className="inline-flex items-center gap-2.5 bg-blue-50 px-4 py-1.5 rounded">
                {searchFilter.title}
                <img
                  onClick={() => setSearchFilter((prev) => ({ ...prev, title: "" }))}
                  className="cursor-pointer"
                  src={assets.cross_icon}
                  alt="Remove filter"
                />
              </span>
            )}
            {searchFilter.location && (
              <span className="ml-2.5 inline-flex items-center gap-2.5 bg-red-50 px-4 py-1.5 rounded">
                {searchFilter.location}
                <img
                  onClick={() => setSearchFilter((prev) => ({ ...prev, location: "" }))}
                  className="cursor-pointer"
                  src={assets.cross_icon}
                  alt="Remove filter"
                />
              </span>
            )}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Nothing is Searched</p>
        )}

        {/* Toggle Filter Button (Mobile) */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-2 rounded-lg border border-gray-400 bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 lg:hidden"
        >
          {showFilter ? "❌ Close" : "🛠️ Filters"}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-semibold text-xl pb-3 mt-10">Search by Categories</h4>
          <ul className="mt-2 space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex gap-3 items-center px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200">
                <input
                  className="scale-125 accent-blue-600 cursor-pointer"
                  type="checkbox"
                  id={`category-${index}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <label htmlFor={`category-${index}`} className="cursor-pointer text-gray-700">{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-semibold text-xl pb-3 mt-14">Search by Location</h4>
          <ul className="mt-2 space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex gap-3 items-center px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200">
                <input
                  className="scale-125 accent-blue-600 cursor-pointer"
                  type="checkbox"
                  id={`location-${index}`}
                  checked={selectedLocations.includes(location)}
                  onChange={() => toggleLocation(location)}
                />
                <label htmlFor={`location-${index}`} className="cursor-pointer text-gray-700">{location}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listing Section */}
      <section className="w-full lg:w-3/4 text-gray-900 max-lg:px-4">
        <h3 className="font-semibold text-3xl py-3 border-b-2 border-blue-500 inline-block">🚀 Latest Jobs</h3>
        <p className="mt-2 mb-6 text-gray-600 text-lg">Find your next big opportunity at top companies.</p>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <div key={index} className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <Jobcard job={job} />
              </div>
            ))
          ) : (
            <p className="text-gray-600">No jobs found matching your filters.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="btn">⬅ Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => changePage(i + 1)} className={`btn ${currentPage === i + 1 ? "active" : ""}`}>{i + 1}</button>
          ))}
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className="btn">Next ➡</button>
        </div>
      </section>
    </div>
  );
};

export default JobListing;
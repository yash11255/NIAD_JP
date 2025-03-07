import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations, assets } from "../assets/assets";
import Jobcard from "./Jobcard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const jobsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = searchFilter.title ? job.title.toLowerCase().includes(searchFilter.title.toLowerCase()) : true;
    const matchesLocation = searchFilter.location ? job.location.toLowerCase().includes(searchFilter.location.toLowerCase()) : true;
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(job.category) : true;
    const matchesSelectedLocation = selectedLocations.length > 0 ? selectedLocations.includes(job.location) : true;
    return matchesTitle && matchesLocation && matchesCategory && matchesSelectedLocation;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLocations, searchFilter]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 2xl:px-20 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Enhanced Sidebar */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Current Filters</h3>

            {/* Active Filters */}
            <div className="space-y-2 mb-6">
              {isSearched && (searchFilter.title || searchFilter.location) ? (
                <div className="flex flex-wrap gap-2">
                  {searchFilter.title && (
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm font-medium transition-all duration-300 hover:shadow-md">
                      {searchFilter.title}
                      <button
                        onClick={() => setSearchFilter((prev) => ({ ...prev, title: "" }))}
                        className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                      >
                        <img src={assets.cross_icon} alt="Remove" className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {searchFilter.location && (
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 px-4 py-2 rounded-full text-red-700 text-sm font-medium transition-all duration-300 hover:shadow-md">
                      {searchFilter.location}
                      <button
                        onClick={() => setSearchFilter((prev) => ({ ...prev, location: "" }))}
                        className="hover:bg-red-200 rounded-full p-1 transition-colors"
                      >
                        <img src={assets.cross_icon} alt="Remove" className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">No active filters</p>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="w-full lg:hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-6"
            >
              {showFilter ? "Hide Filters ↑" : "Show Filters ↓"}
            </button>

            {/* Filter Sections */}
            <div className={`space-y-8 ${showFilter ? 'block' : 'hidden lg:block'}`}>
              {/* Categories */}
              <div className="pb-6 border-b border-gray-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Categories</h4>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {JobCategories.map((category, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Locations</h4>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {JobLocations.map((location, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Job Listing Section */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              🚀 Latest Opportunities
            </h3>
            <p className="text-gray-600">
              Discover {filteredJobs.length} exciting positions matching your criteria
            </p>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <Jobcard job={job} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No matching jobs found</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLocations([]);
                    setSearchFilter({ title: "", location: "" });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => changePage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
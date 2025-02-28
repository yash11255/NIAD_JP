import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations, assets, jobsData } from "../assets/assets";
import Jobcard from "./Jobcard";

const JobListing = () => {
  // Accessing global state from AppContext
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg: space-y-8 py-8">
      {/* Sidebar for filtering job listings */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Always show the "Current Search" heading */}
        <h3 className="font-medium text-lg mb-4">Current Search</h3>

        {/* Display search filters only if applied */}
        {(isSearched && (searchFilter.title || searchFilter.location)) ? (
          <div className="mb-4 text-gray-600">
            {/* Job Title Filter */}
            {searchFilter.title && (
              <span className="inline-flex items-center gap-2.5 bg-blue-50 border-red-600 px-4 py-1.5 mt-3 rounded">
                {searchFilter.title}
                <img
                  onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                  className="cursor-pointer"
                  src={assets.cross_icon}
                  alt="Remove filter"
                />
              </span>
            )}

            {/* Location Filter */}
            {searchFilter.location && (
              <span className="ml-2.5 inline-flex items-center gap-2.5 bg-red-50 border-blue-200 px-4 py-1.5 mt-3 rounded">
                {searchFilter.location}
                <img
                  onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                  className="cursor-pointer"
                  src={assets.cross_icon}
                  alt="Remove filter"
                />
              </span>
            )}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Nothing is Searched</p> // Placeholder when no filters are set
        )}

        {/* category filter */}
        <div className="max-lg:hidden p-4">
          <h4 className="font-semibold text-xl pb-3">Search by Categories</h4>

          {/* Scrollable List */}
          <ul className="mt-2 space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {JobCategories.map((category, index) => (
              <li
                key={index}
                className="flex gap-3 items-center px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <input
                  className="scale-125 accent-blue-600 cursor-pointer"
                  type="checkbox"
                  id={`category-${index}`}
                />
                <label htmlFor={`category-${index}`} className="cursor-pointer text-gray-700">
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>


        {/* location filter */}
        <div className="max-lg:hidden p-4 pt-14">
          <h4 className="font-semibold text-xl pb-3">Search by Location</h4>

          {/* Scrollable List */}
          <ul className="mt-2 space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {JobLocations.map((location, index) => (
              <li
                key={index}
                className="flex gap-3 items-center px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <input
                  className="scale-125 accent-blue-600 cursor-pointer"
                  type="checkbox"
                  id={`category-${index}`}
                />
                <label htmlFor={`category-${index}`} className="cursor-pointer text-gray-700">
                  {location}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Job Listing */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
  <h3 className="font-medium text-3xl py-2" id="job-list">
    Latest Jobs
  </h3>
  <p className="mb-4 text-gray-600">
    Land Your Dream Job at Top Companies
  </p>

  {/* Grid layout for job listings */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
    {jobsData.map((job, index) => (
      <Jobcard key={index} job={job} />
    ))}
  </div>
</section>


    </div>


  );
};

export default JobListing;
import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 1000+ JOBS ARE POSTED
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae laboriosam consectetur amet quos placeat deserunt libero commodi a assumenda! Sequi maxime, repellendus fugit obcaecati odit deleniti sit rerum delectus quaerat?
        </p>

        {/* Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg text-gray-600 px-4 py-2 shadow-md max-w-2xl mx-auto">
          
          {/* Job Search Input */}
          <div className="flex items-center w-full sm:w-1/2 border-r sm:border-r-2 border-gray-300 pr-2">
            <img src={assets.search_icon} alt="Search Icon" className="w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="Search for jobs" 
              className="w-full p-2 text-sm rounded outline-none"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center w-full sm:w-1/2 pl-2">
            <img src={assets.location_icon} alt="Location Icon" className="w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="Location" 
              className="w-full p-2 text-sm rounded outline-none"
            />
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 text-white font-medium px-6 py-2 rounded-full ml-2 hover:bg-blue-700 transition">
            Search
          </button>

        </div>
      </div>
    </div>
  );
};

export default Hero;
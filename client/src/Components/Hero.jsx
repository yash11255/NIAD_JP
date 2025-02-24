import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);
    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        const searchCriteria = {
            title: titleRef.current?.value || "",
            location: locationRef.current?.value || ""
        };

        setSearchFilter(searchCriteria);
        setIsSearched(true);
        console.log(searchCriteria);
    };

    return (
        <div className="container px-4 sm:px-6 lg:px-20 mx-auto my-10">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-12 sm:py-16 text-center mx-2 rounded-xl">
                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 px-4">
                    Over 1000+ JOBS ARE POSTED
                </h2>
                <p className="mb-5 sm:mb-8 max-w-xl mx-auto text-xs sm:text-sm font-light px-5">
                    🔍 Explore thousands of job opportunities from top companies. Whether you’re looking for your first job, a career switch, or a freelance gig, we’ve got you covered. Start your journey now!
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg text-gray-600 px-3 sm:px-4 py-2 sm:py-3 shadow-md max-w-lg sm:max-w-2xl mx-auto gap-3 sm:gap-6">
                    
                    {/* Job Search Input */}
                    <div className="flex items-center w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-300 pr-2 mb-2 sm:mb-0">
                        <img src={assets.search_icon} alt="Search Icon" className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search for jobs" 
                            className="w-full px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm rounded outline-none"
                            ref={titleRef}
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center w-full sm:w-1/2 pl-2">
                        <img src={assets.location_icon} alt="Location Icon" className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Location" 
                            className="w-full px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm rounded outline-none"
                            ref={locationRef}
                        />
                    </div>

                    {/* Search Button */}
                    <button 
                        onClick={onSearch} 
                        className="bg-blue-600 text-white font-medium px-4 sm:px-6 py-2 rounded-full mt-2 sm:mt-0 sm:ml-2 hover:bg-blue-700 transition w-full sm:w-auto">
                        Search
                    </button>
                </div>
            </div>

            {/* Trusted By Section */}
            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-4 sm:p-6 rounded-md flex flex-col items-center">
                <p className="font-medium mb-3 sm:mb-4">TRUSTED BY</p>
                <div className="flex justify-center gap-4 sm:gap-10 lg:gap-16 flex-wrap w-full">
                    <img className="h-4 sm:h-6" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-4 sm:h-6" src={assets.walmart_logo} alt="Walmart" />
                    <img className="h-4 sm:h-6" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-4 sm:h-6" src={assets.accenture_logo} alt="Accenture" />
                    <img className="h-4 sm:h-6" src={assets.samsung_logo} alt="Samsung" />
                    <img className="h-4 sm:h-6" src={assets.amazon_logo} alt="Amazon" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Jobcard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-200 p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] group">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <img className="h-10 w-10 object-contain" src={job.companyId.image} alt={job.companyId.name} />
                <span className="bg-blue-100 text-blue-600 text-[10px] font-medium px-2 py-1 rounded-md">
                    {job.experience} Experience Required
                </span>
            </div>

            {/* Job Title */}
            <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{job.title}</h4>

            {/* Job Info Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                <span className="bg-blue-50 text-blue-700 border border-blue-300 px-3 py-1 rounded-md">
                    📍 {job.location}
                </span>
                <span className="bg-red-50 text-red-700 border border-red-300 px-3 py-1 rounded-md">
                    ⚡ {job.level}
                </span>
            </div>

            {/* Job Description Preview */}
            <p className="text-gray-600 text-sm mt-4 line-clamp-3" 
                dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}>
            </p>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-3 text-sm">
                <button 
                    onClick={() => { 
                        navigate(`/apply-job/${job._id}`); 
                        window.scrollTo(0, 0); 
                    }} 
                    className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
                >
                    Apply Now
                </button>
                <button 
                    onClick={() => { 
                        navigate(`/apply-job/${job._id}`); 
                        window.scrollTo(0, 0); 
                    }} 
                    className="text-gray-600 border border-gray-400 px-5 py-2 rounded-md hover:bg-gray-100 transition"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Jobcard;
import React from 'react';
import { assets } from '../assets/assets';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img src={assets.logo} alt="Logo" />

        {user ? (
          <div className="flex items-center gap-3">
            {/* Link to Applied Jobs page */}
            <Link to="/application" className="text-gray-600 hover:underline">
              Applied Jobs
            </Link>
            
            <p></p> {/* Keeping the empty <p> tag as requested */}
            
            <p>Welcome {user?.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button className="text-gray-600">Recruiter Login</button>
            <button
              onClick={openSignIn}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
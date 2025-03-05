import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import UserLogin from "./UserLogin";

// Removed Clerk's UserButton and useUser

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Use userData and isUserAuthenticated from AppContext instead of Clerk's hook
  const { userData, isUserAuthenticated, setShowRecruiterLogin, logoutUser } =
    useContext(AppContext);

  return (
    <>
      {/* Main Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
          {/* Logo */}
          <img src={assets.logo} alt="Logo" className="h-8 sm:h-10" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isUserAuthenticated ? (
              <>
                <Link
                  to="/application"
                  className="text-gray-600 hover:underline"
                >
                  Applied Jobs
                </Link>
                <p>
                  Welcome, {userData?.firstName || userData?.name || "User"}
                </p>
                <button
                  onClick={logoutUser}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <button
                  className="text-gray-600"
                  onClick={() => setShowRecruiterLogin(true)}
                >
                  Recruiter Login
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <FiMenu className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 p-6`}
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <FiX className="w-7 h-7" />
          </button>

          {/* Mobile Menu Items */}
          <div className="flex flex-col gap-6 mt-10">
            {isUserAuthenticated ? (
              <>
                <Link
                  to="/application"
                  className="text-gray-600 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Applied Jobs
                </Link>
                <p>
                  Welcome, {userData?.firstName || userData?.name || "User"}
                </p>
                <button
                  onClick={() => {
                    logoutUser();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-gray-600"
                  onClick={() => {
                    setShowRecruiterLogin(true);
                    setMenuOpen(false);
                  }}
                >
                  Recruiter Login
                </button>
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Render UserLogin Modal if loginOpen is true */}
      <UserLogin isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;

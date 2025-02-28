import React, { useState } from "react";
import { assets } from "../assets/assets";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow py-4 bg-white">
      <div className="container px-4 lg:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-10 sm:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/application"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Applied Jobs
              </Link>
              <span className="text-gray-500">Welcome, {user?.firstName}</span>
              <UserButton />
            </>
          ) : (
            <div className="flex gap-4">
              <button className="text-gray-700 hover:text-blue-600 transition">
                Recruiter Login
              </button>
              <button
                onClick={openSignIn}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <FiMenu className="w-7 h-7 text-gray-700 hover:text-blue-600 transition" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Sliding from Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 p-6 z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition"
        >
          <FiX className="w-7 h-7" />
        </button>

        {/* Mobile Menu Items */}
        <div className="flex flex-col gap-6 mt-10">
          {user ? (
            <>
              <Link
                to="/application"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Applied Jobs
              </Link>
              <span className="text-gray-500">Welcome, {user?.firstName}</span>
              <UserButton />
            </>
          ) : (
            <>
              <button className="text-gray-700 hover:text-blue-600 transition">
                Recruiter Login
              </button>
              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
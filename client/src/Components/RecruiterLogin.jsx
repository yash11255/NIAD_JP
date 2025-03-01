import React, { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = ({ isOpen, onClose }) => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 z-10 
                 backdrop-blur-sm bg-black/30 
                 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <form
        className="bg-white p-6 rounded shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl mb-2">Recruiter {state}</h1>
        <p className="mb-4">Welcome Back! Please sign in to continue</p>

        {/* Company Name */}
        <div className="mb-4 flex items-center">
          <img src={assets.person_icon} alt="person icon" className="mr-2" />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Company name"
            required
            className="border p-2 flex-1"
          />
        </div>

        {/* Email */}
        <div className="mb-4 flex items-center">
          <img src={assets.email_icon} alt="email icon" className="mr-2" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email ID"
            required
            className="border p-2 flex-1"
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex items-center">
          <img src={assets.lock_icon} alt="lock icon" className="mr-2" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="border p-2 flex-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            {state === "login" ? "Login" : "Create Account"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterLogin;

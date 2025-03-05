import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env?.VITE_BACKEND_URL || "http://localhost:5001";

const UserLogin = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [state, setState] = useState("login"); // 'login' | 'signup' | 'forgot'
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Using user-specific state setters from AppContext
  const { setShowUserLogin, setUserData, setIsUserAuthenticated } =
    useContext(AppContext);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        // User Login API call
        const { data } = await axios.post(
          `${backendUrl}/api/users/user-login`,
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          setUserData(data.user);
          setIsUserAuthenticated(true);
          alert("Logged in successfully!");
          setShowUserLogin(false); // CHANGED: Hides modal in global context
          onClose(); // CHANGED: Automatically closes the modal via prop
          // Optionally navigate to a protected user dashboard:
          // navigate("/user-dashboard");
        } else {
          alert(data.message);
        }
      } else if (state === "signup") {
        // User Signup API call (no file upload needed)
        const { data } = await axios.post(
          `${backendUrl}/api/users/user-register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          setUserData(data.user);
          setIsUserAuthenticated(true);
          alert("Account created successfully!");
          setShowUserLogin(false); // CHANGED: Hides modal in global context
          onClose(); //
        } else {
          alert(data.message);
        }
      } else if (state === "forgot") {
        // Forgot Password API call for user
        const { data } = await axios.post(
          `${backendUrl}/api/user/forgot-password`,
          { email },
          { withCredentials: true }
        );

        if (data.success) {
          alert("Password reset link sent to your email!");
          setState("login");
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Error in API call:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-96 shadow-lg transform transition-all scale-100 hover:scale-[1.02]"
      >
        {/* Close Button */}
        <img
          onClick={onClose}
          className="absolute top-5 right-5 cursor-pointer w-6 h-6"
          src={assets.cross_icon}
          alt="Close"
        />

        {/* Header */}
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          User{" "}
          {state === "login"
            ? "Login"
            : state === "signup"
            ? "Sign Up"
            : "Reset Password"}
        </h1>
        <p className="text-sm text-center text-gray-500">
          {state === "login"
            ? "Welcome back! Please sign in to continue"
            : state === "signup"
            ? "Join us today!"
            : "Enter your email to reset your password"}
        </p>

        {/* Name field (Signup only) */}
        {state === "signup" && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.person_icon} alt="Name" className="w-5 h-5" />
            <input
              className="outline-none text-sm w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
          <input
            className="outline-none text-sm w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password field (hidden for forgot password) */}
        {state !== "forgot" && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.lock_icon} alt="Password" className="w-5 h-5" />
            <input
              className="outline-none text-sm w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
        )}

        {/* Forgot Password Link (only in login mode) */}
        {state === "login" && (
          <p
            className="text-sm text-blue-600 mt-4 cursor-pointer text-right"
            onClick={() => setState("forgot")}
          >
            Forgot password?
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition-all duration-200"
        >
          {state === "login"
            ? "Login"
            : state === "signup"
            ? "Create Account"
            : "Reset Password"}
        </button>

        {/* Toggle Login & Signup */}
        {state !== "forgot" && (
          <p className="mt-5 text-center text-sm">
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState(state === "login" ? "signup" : "login")}
            >
              {state === "login" ? "Sign Up" : "Login"}
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default UserLogin;

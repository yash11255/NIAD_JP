import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [state, setState] = useState("login"); // 'login' | 'signup' | 'forgot'
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "signup" && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      if (state === "login") {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (state === "signup") {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (state === "forgot") {
        const { data } = await axios.post(`${backendUrl}/api/company/forgot-password`, {
          email,
        });

        if (data.success) {
          toast.success("Password reset link sent to your email!");
          setState("login");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
          Recruiter {state === "login" ? "Login" : state === "signup" ? "Sign Up" : "Reset Password"}
        </h1>
        <p className="text-sm text-center text-gray-500">
          {state === "login"
            ? "Welcome back! Please sign in to continue"
            : state === "signup"
            ? "Join us today!"
            : "Enter your email to reset your password"}
        </p>

        {/* Upload Image (Signup) */}
        {state === "signup" && isTextDataSubmited && (
          <div className="flex items-center gap-4 my-10">
            <label htmlFor="image">
              <img
                className="w-16 rounded-full"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
              />
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <p>Upload Company Logo</p>
          </div>
        )}

        {/* Input Fields */}
        {!isTextDataSubmited || state !== "signup" ? (
          <>
            {/* Company Name (Signup) */}
            {state === "signup" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="Company" className="w-5 h-5" />
                <input
                  className="outline-none text-sm w-full"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
              <input
                className="outline-none text-sm w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
              />
            </div>

            {/* Password (Not for Forgot Password) */}
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
          </>
        ) : null}

        {/* Forgot Password Link (Login Mode Only) */}
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
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
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

export default RecruiterLogin;
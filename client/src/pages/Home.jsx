import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import JobListing from "../Components/JobListing";
import AppDownload from "../Components/AppDownload";
import Footer from "../Components/Footer";
import RecruiterLogin from "../Components/RecruiterLogin"; // Import Popup

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <Navbar onRecruiterLogin={() => setIsPopupOpen(true)} />
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />

      {/* Recruiter Login Popup */}
      <RecruiterLogin isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Home;
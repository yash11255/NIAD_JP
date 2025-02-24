import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import JobListing from '../Components/JobListing';

const Home = () => {
  

  return (
    <div>
     <Navbar/>
     <Hero />
     <JobListing />
    </div>
  );
};

export default Home;
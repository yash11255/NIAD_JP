import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Application from './pages/Application'; // Fix typo in filename if needed
import ApplyJob from './pages/ApplyJob';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/application' element={<Application />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} /> {/* ✅ Fixed route */}
      </Routes>
    </div>
  );
};

export default App;
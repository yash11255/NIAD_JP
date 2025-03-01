import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Application from './pages/Application';
import ApplyJob from './pages/ApplyJob';
import RecruiterLogin from './Components/RecruiterLogin';
import { AppContext } from './context/AppContext';

const App = () => {
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);
  return (
    <div>
      {/* Recruiter Login Popup should only render when needed */}
      {showRecruiterLogin && (
        <RecruiterLogin isOpen={showRecruiterLogin} onClose={() => setShowRecruiterLogin(false)} />
      )}

      {/* Page Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/application' element={<Application />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} /> 
      </Routes>
    </div>
  );
};

export default App;
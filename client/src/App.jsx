import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./pages/Application";
import ApplyJob from "./pages/ApplyJob";
import RecruiterLogin from "./Components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import ApplyJobForm from "./pages/ApplyJobForm";

const App = () => {
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);
  // console.log("fro app", showRecruiterLogin);
  return (
    <div>
      {/* Recruiter Login Popup should only render when needed */}
      {showRecruiterLogin && (
        <RecruiterLogin
          isOpen={showRecruiterLogin}
          onClose={() => setShowRecruiterLogin(false)}
        />
      )}

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/apply-job-form" element={<ApplyJobForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

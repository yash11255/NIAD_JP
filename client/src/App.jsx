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
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import UserPrivateRoute from "./Routes/UserPrivateRoute.jsx";
import RecruiterPublicRoute from "./Routes/RecruiterPublicRoute.jsx";

const App = () => {
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {/* Recruiter Login Popup */}
      {showRecruiterLogin && (
        <RecruiterLogin
          isOpen={showRecruiterLogin}
          onClose={() => setShowRecruiterLogin(false)}
        />
      )}

      {/* Page Routes */}
      <Routes>
        <Route element={<RecruiterPublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<UserPrivateRoute />}>
          <Route path="/application" element={<Application />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/apply-job-form/:id" element={<ApplyJobForm />} />
        </Route>

        {/* ✅ Protected recruiter routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJobs />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

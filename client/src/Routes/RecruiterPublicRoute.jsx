// RecruiterPublicRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function RecruiterPublicRoute() {
  const { isAuthenticated } = useContext(AppContext);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, show the child route
  return <Outlet />;
}

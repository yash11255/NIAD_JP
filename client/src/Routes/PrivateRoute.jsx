import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;

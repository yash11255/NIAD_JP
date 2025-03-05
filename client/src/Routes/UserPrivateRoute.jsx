import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";

const UserPrivateRoute = () => {
  //   const { isUserAuthenticated } = useContext(AppContext);
  const { isUserAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated === false) {
      navigate("/");
    }
  }, [isUserAuthenticated, navigate]);
  console.log("User authentication status:", isUserAuthenticated);

  if (isUserAuthenticated === null) return <p>Loading...</p>;

  return isUserAuthenticated ? <Outlet /> : null;
};

export default UserPrivateRoute;

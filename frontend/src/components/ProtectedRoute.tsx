import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC =() => {
  const token : string | undefined = Cookie.get("reviva-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign");
    }
  }, [token, navigate]);

  // If the user is authenticated, render the nested routes(<Outlet/>), otherwise nothing (or redirect)
  return token ? <Outlet /> : null;
}

export default ProtectedRoute;

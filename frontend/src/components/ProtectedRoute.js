import { useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = Cookie.get("reviva-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign");
    }
  }, [token, navigate]);

  // If the user is authenticated, render the nested routes, otherwise nothing (or redirect)
  return token ? <Outlet /> : null;
}

export default ProtectedRoute;

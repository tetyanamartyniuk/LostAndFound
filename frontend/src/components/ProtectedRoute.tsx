import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const { authenticated, loading } = useAuth();
  console.log("authenticated ProtectedRoute", authenticated);

  if (loading) {
    return <h2>Checking authorization...</h2>;
  }

  if (!authenticated) {
    return <Navigate replace to="/auth/login"></Navigate>;
  }

  return <Outlet />;
}

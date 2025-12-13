import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem("fixmyunesa_token");
  const role = localStorage.getItem("fixmyunesa_role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    if (role === "admin") {
      return <Navigate to="/admin/managereports" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;

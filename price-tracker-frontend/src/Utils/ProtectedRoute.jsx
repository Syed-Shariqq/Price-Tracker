import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    return <Navigate to="/auth" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/auth" replace />;
    }

  } catch (err) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
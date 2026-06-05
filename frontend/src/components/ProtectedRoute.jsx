import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;  // replace prevents back-button returning to protected page
  }

  return children;
}

export default ProtectedRoute;
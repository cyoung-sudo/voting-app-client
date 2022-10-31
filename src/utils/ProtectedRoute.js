// Routing
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if(!user) {
    console.log("Session has expired");
    return <Navigate to="/" replace />;
  }
  return children;
};
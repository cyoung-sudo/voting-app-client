// React
import { useEffect } from "react";
// Routing
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  useEffect(() => {
    if(!props.user) {
      props.handlePopUp("Session has expired", "error");
    }
  }, [])

  if(!props.user) {
    return <Navigate to="/" replace />;
  }
  return props.children;
};
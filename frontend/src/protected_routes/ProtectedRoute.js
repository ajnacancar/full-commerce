import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

function ProtectedRoute({ isAuthenticated, children, redirectTo, isLoading }) {
  if (isLoading == true) {
    setTimeout(() => {
      return <Loader />;
    }, 5000);
  } else {
    if (!isAuthenticated) {
      return <Navigate to={`/${redirectTo}`} />;
    }
  }

  return children;
}

export default ProtectedRoute;

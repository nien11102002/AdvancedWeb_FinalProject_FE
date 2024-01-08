import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestGuard = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) {
    return <div>Loading</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;

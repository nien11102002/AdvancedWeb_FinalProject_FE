import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthGuard = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) {
    return <div>Loading</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

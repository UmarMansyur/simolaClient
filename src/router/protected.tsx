import React from "react";
import { Navigate } from "react-router-dom";
interface typeRoutes {
  redirectPath?: string;
  children?: React.ReactNode;
  isAdmin?: boolean;
}



const ProtectedRoute = ({ children, redirectPath = "/login" }: typeRoutes) => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
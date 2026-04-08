import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Wait for AuthContext to finish checking localStorage and the Backend
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#0039A6]" />
      </div>
    );
  }

  // If no user is logged in, instantly redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow them to see the page
  return children;
};

export default ProtectedRoute;
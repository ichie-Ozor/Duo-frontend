import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/app/auth/Context";
import toast from "react-hot-toast";

export default function ProtectedRoute({
  children,
  rolesAllowed,
  rolesDenied,
}) {
  const { user } = useContext(AuthContext);
  console.log(user, "protcted route");

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (rolesDenied && rolesDenied.includes(user.accessTo)) {
    toast.error("you are not granted assess to that page");
    return <Navigate to={"/dashboard"} replace />;
  }

  if (rolesAllowed && !rolesAllowed.includes(user.accessTo)) {
    toast.error("you are not granted assess to that page");
    return <Navigate to={"/dashboard"} replace />;
  }
  return children;
}

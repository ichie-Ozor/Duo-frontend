import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/app/auth/Context";
import toast from "react-hot-toast";

export default function ProtectedRoute({
  children,
  rolesAllowed,
  rolesDenied,
}) {
  const { user, setToken, token } = useContext(AuthContext);
  setToken(localStorage.getItem("@@token"));
  let d = localStorage.getItem("@token");
  console.log(user, "protcted route", d, token);

  if (!user && !d) {
    return <Navigate to={"/login"} replace />;
  }
  // if (token) {
  //   window.location();
  // }
  if (rolesDenied && rolesDenied.includes(user?.accessTo)) {
    toast.error("you are not granted assess to that page");
    return <Navigate to={"/dashboard"} replace />;
  }

  if (rolesAllowed && !rolesAllowed.includes(user?.accessTo)) {
    toast.error("you are not granted assess to that page");
    return <Navigate to={"/dashboard"} replace />;
  }
  return children;
}

import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import store from "store";
import ResetPassword from "@/pages/Auth/ResetPassword";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const MainRoutes = () => {
  const authUser = store.get("user");
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path="/auth/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/auth/reset-password"
        element={authUser ? <Navigate to="/" /> : <ResetPassword />}
      />
      <Route
        path="/auth/sign-up"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to="/auth/login" />}
      />
    </Routes>
  );
};

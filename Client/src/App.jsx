import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {Loader} from "lucide-react"
import { useAuthStore } from "./store/useAuthStore";
import { useNavigate } from "react-router-dom";

const App = () => {

  const {authUser, checkAuthUser, isCheckingAuth} = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthUser()
  }, [checkAuthUser]);


  console.log(authUser)

  if(isCheckingAuth) return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <Loader className="size-15 animate-spin text-white"/>
    </div>
  )


  return (
    <div className="bg-slate-800">
      <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;

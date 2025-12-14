import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import Userlogin from "./pages/Userlogin";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserAuth from "./pages/UserAuth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<UserAuth />} />
        <Route path="/user/login" element={<Userlogin />} />
        <Route path="/user/register" element={<UserRegistration />} />

        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App;

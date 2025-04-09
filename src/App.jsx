import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Player from "./pages/player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();

  // Firebase Auth
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        navigate("/");
      } else {
        console.log("logged out");
        navigate("/login");
      }
    });
  }, []);

  // In-App Browser Redirect
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const url = window.location.href;

    function isInAppBrowser() {
      return (
        userAgent.includes("FBAN") ||
        userAgent.includes("FBAV") || // Facebook
        userAgent.includes("Instagram") ||
        userAgent.includes("LinkedInApp") ||
        userAgent.includes("Snapchat") ||
        userAgent.includes("TikTok") ||
        userAgent.includes("Pinterest") ||
        userAgent.includes("YouTube") ||
        userAgent.includes("Twitter") ||
        userAgent.includes("WhatsApp") ||
        userAgent.includes("Gmail") ||
        userAgent.includes("com.google.android.gm")
      );
    }

    function openInDefaultBrowser() {
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        window.location.href = "x-web-search:" + url;
      } else if (/Android/i.test(userAgent)) {
        window.location.href =
          "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end;";
      }
    }

    if (isInAppBrowser()) {
      openInDefaultBrowser();
    }
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Player from "./pages/player/Player";
import RedirectBridge from "./pages/redirectBridge/RedirectBridge";
import { Route, Routes, useNavigate } from "react-router-dom";
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

  // In-App Browser Redirect (via /redirect page)
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const currentURL = window.location.href;

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

    function redirectToBridge() {
      // Make sure to encode the full URL including protocol
      const fullUrl = currentURL.includes('http') ? currentURL : `https://${window.location.host}${window.location.pathname}`;
      const encodedURL = encodeURIComponent(fullUrl);
      const redirectBridgeURL = `${window.location.origin}/redirect-bridge?target=${encodedURL}`;
      window.location.replace(redirectBridgeURL);
    }

    if (isInAppBrowser()) {
      redirectToBridge();
    }
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path="/redirect-bridge" element={<RedirectBridge />} /> {/* This matches the redirect path now */}
      </Routes>
    </div>
  );
};

export default App;

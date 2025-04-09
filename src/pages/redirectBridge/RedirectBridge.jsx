// RedirectBridge.jsx
import { useEffect } from "react";

const RedirectBridge = () => {
  useEffect(() => {
    const url = new URLSearchParams(window.location.search).get("target");

    if (url) {
      // Slight delay to ensure rendering
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    }
  }, []);

  return (
    <div style={{ padding: "2rem", fontSize: "1.2rem" }}>
      Redirecting you to your browser...
      <br />
      If nothing happens, <a href={decodeURIComponent(window.location.search.split("=")[1])}>click here</a>.
    </div>
  );
};

export default RedirectBridge;

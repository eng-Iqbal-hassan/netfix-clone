import { useEffect } from "react";

const RedirectBridge = () => {
  useEffect(() => {
    const currentUrl = window.location.href.split('?target=')[1];
    
    if (currentUrl) {
      const decodedUrl = decodeURIComponent(currentUrl);
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      setTimeout(() => {
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // For iOS devices, use a more reliable method
          window.location.replace(decodedUrl);
        } else if (/Android/i.test(userAgent)) {
          window.location.href = 
            "intent://" + decodedUrl.replace(/^https?:\/\//, "") + 
            "#Intent;scheme=https;package=com.android.chrome;end;";
        } else {
          window.location.replace(decodedUrl);
        }
      }, 500);
    }
  }, []);

  const targetUrl = decodeURIComponent(window.location.search.split("=")[1] || "");

  return (
    <div style={{ 
      padding: "2rem", 
      fontSize: "1.2rem",
      textAlign: "center",
      marginTop: "40vh"
    }}>
      <div>Redirecting you to your browser...</div>
      <div style={{ marginTop: "1rem" }}>
        If nothing happens, <a href={targetUrl}>click here</a>
      </div>
    </div>
  );
};

export default RedirectBridge;

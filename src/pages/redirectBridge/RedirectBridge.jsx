// RedirectBridge.jsx
import { useEffect } from "react";

const RedirectBridge = () => {
  useEffect(() => {
    const currentUrl = window.location.href.split('?target=')[1];
    
    if (currentUrl) {
      const decodedUrl = decodeURIComponent(currentUrl);
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      setTimeout(() => {
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          window.location.href = "x-web-search://" + decodedUrl;
        } else if (/Android/i.test(userAgent)) {
          window.location.href = 
            "intent://" + decodedUrl.replace(/^https?:\/\//, "") + 
            "#Intent;scheme=https;package=com.android.chrome;end;";
        } else {
          window.location.href = decodedUrl;
        }
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

export const isInAppBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
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
};

export const openInDefaultBrowser = (url) => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    window.location.href = "x-web-search:" + url;
  } else if (/Android/i.test(userAgent)) {
    window.location.href =
      "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end;";
  }
};
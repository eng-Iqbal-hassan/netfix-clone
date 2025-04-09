import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjYwN2Y1NzU1MzAzN2U2YTNlMjkwYzJmZDNhYTEzOSIsIm5iZiI6MTczMTE2NTg4MC42NDU1MTcsInN1YiI6IjY3MmY3ZDhjNDViODcwMjMxOTYyYTdlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Yh6jIROUdHB7fNuecm1JQgdnu5oiVgkeHgZVyghuxU",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, [id]);

  // In-App Browser Redirect Logic
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const url = window.location.href;

    function isInAppBrowser() {
      return (
        userAgent.includes("FBAN") ||
        userAgent.includes("FBAV") ||
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
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={() => navigate(-2)} />
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;

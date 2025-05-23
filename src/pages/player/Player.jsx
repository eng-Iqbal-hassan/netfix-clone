import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { isInAppBrowser, openInDefaultBrowser } from "../../utils/browserDetection";

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

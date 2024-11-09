import React, {useEffect, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import './TitleCards.css'

const TitleCards = ({title, category}) => {


  const [apiData, setApiData] = useState([])
  const handleWheel =  (event) => {
    event.preventDefault();  
    cardsRef.current.scrollLeft += event.deltaY;
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjYwN2Y1NzU1MzAzN2U2YTNlMjkwYzJmZDNhYTEzOSIsIm5iZiI6MTczMTE2NTg4MC42NDU1MTcsInN1YiI6IjY3MmY3ZDhjNDViODcwMjMxOTYyYTdlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Yh6jIROUdHB7fNuecm1JQgdnu5oiVgkeHgZVyghuxU'
    }
  };
  
  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className='card-list'>
      {apiData.map((data, index)=>(
        <div key={index} className='card'>
          <img src={`https://image.tmdb.org/t/p/w500`+data?.backdrop_path} alt="" />
          <p>{data?.original_title}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TitleCards

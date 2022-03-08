import React, { useEffect, useState } from "react";

import MovieCard from './MovieCard';
import SeachIcon from './search.svg';
import './App.css'

const API_URL = "http://www.omdbapi.com?apikey=b264c8ef";

// const movie1 = {
//   Poster: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
//   Title: "Spider-Man: No Way Home",
//   Type: "movie",
//   Year: "2021",
//   imdbID: "tt10872600"
// }

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  
  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  };
  

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SeachIcon}
          alt='Search'
          onClick={()=> searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => {
              return <MovieCard movie={movie} />
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies Found</h2>
          </div>
        )}
    </div>
  )
}

export default App;
import {useState , useEffect} from "react";

import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';
//f42000df

const API_url= "https://www.omdbapi.com?apikey=f42000df"; // making api key url
//We need the api to reload as soon as we start the page so we use useEffect hook.

const App = () => {

  const [movies, setMovies] = useState([]); // movies is an array of objects

  const [search, setSearch] = useState(""); // search is a string

  const searchMovies= async (title) => { //async function to search movies
    
    const response= await fetch(`${API_url}&s=${title}`);
   //async and await are used to make the code wait for the response to come back before continuing.
   //fetch will make a request to the API_url and return a promise.

    const data= await response.json();

    setMovies(data.Search);
  }
  // useEffect(() => {
  //   searchMovies('Spiderman');
  // }, []); // [] is the array of dependencies that useEffect will watch for changes and reload only when the dependencies change here it is empty so it will reload every time the page loads.

  return (
    <div className="app">
      <h1>MovieVerse</h1>
      <div className="search">
        <input placeholder="Search for movies" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <img src={SearchIcon} alt="Search" onClick={()=>searchMovies(search)}/>
      </div>

      {
        movies?.length>0
        ? (
          <div className="container">
            {movies.map((movie)=>( //map is used to loop through an array 
              <MovieCard  movie={movie}/> //passing the movie object to the MovieCard component
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      } 
    </div>
  );
}

export default App;

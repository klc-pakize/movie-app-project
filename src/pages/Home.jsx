import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthProviderContext";

const APIKEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loding, setLoding] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = async (API) => {
    setLoding(true);
    try {
      const { data } = await axios.get(API);
      setMovies(data.results);
      console.log("data", data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else if (!currentUser) {
      alert("Please log in to see details");
    } else {
      alert("Please enter a text");
    }
  };

  return (
    <>
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button className="text-white" type="submit">
          SEARCH
        </button>
      </form>

      <div className="container mx-auto px-0 overflow-hidden mb-20">
        <section className="h-[80vh] w-full text-white">
          <div className="w-full h-full relative">
            <div className="absolute z-20  bottom-0 top-[10%] w-full  bg-gradient-to-t  from-black"></div>
            <img
              className="absolute w-full h-full object-cover object-top"
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt={movie?.title}
            />

            <div className=" flex absolute z-40 py-10 sm:px-15 px-10 w-full h-full">
              <div className="w-full h-full flex flex-col">
                <div>
                  <h1 className="movies-title text-white text-[28px] font-semibold max-w-[80%] leading-[130%] sm:max-w-[100%] sm:text-[34px] ">
                    {movie?.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-center flex-wrap">
        {loding ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </>
  );
};

export default Home;

// import {
//   useState,
//   useEffect
// } from "react";
// import MovieCard from "../components/MovieCard";
// import "./MovieGrid.css";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// const moviesURL =
//   import.meta.env.VITE_API;
// const apiKey =
//   import.meta.env.VITE_API_KEY;

// const Home = () => {
//   const [topMovies, setTopMovies] = useState([]);

//   const fetchTopMovies = async () => {
//     try {
//       const pagesToFetch = 3; // Defina o número de páginas que você deseja buscar (cada página contém 20 filmes)
//       const moviePromises = [];

//       for (let page = 1; page <= pagesToFetch; page++) {
//         const topRatedUrl = `${moviesURL}movie/top_rated?api_key=${apiKey}&page=${page}`;
//         moviePromises.push(fetch(topRatedUrl));
//       }

//       const responses = await Promise.all(moviePromises);

//       const moviesData = await Promise.all(
//         responses.map((response) => response.json())
//       );

//       const allMovies = moviesData.flatMap((data) => data.results);

//       setTopMovies(allMovies);
//     } catch (error) {
//       console.error("Erro ao buscar filmes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTopMovies();
//   }, []);

//   return ( <
//     <div className = "container" >
//     <
//     <h2 className = "title" > Filmes < /h2> <
//     <div className = "movies-container" > {
//       topMovies.length === 0 ? ( <
//         <p > Carregando... < /p>
//       ) : (
//         topMovies.map((movie, index) => ( <
//           MovieCard key = {
//             `${movie.id}-${index}`
//           }
//           movie = {
//             movie
//           }
//           />
//         ))
//       )
//     } <
//     /div> < /
//     div >
//   );
// };

// export default Home;





import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./MovieGrid.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const fetchTopMovies = async () => {
    try {
      const pagesToFetch = 3; // Defina o número de páginas que você deseja buscar (cada página contém 20 filmes)
      const moviePromises = [];

      for (let page = 1; page <= pagesToFetch; page++) {
        const topRatedUrl = `${moviesURL}movie/top_rated?api_key=${apiKey}&page=${page}`;
        moviePromises.push(fetch(topRatedUrl));
      }

      const responses = await Promise.all(moviePromises);

      const moviesData = await Promise.all(
        responses.map((response) => response.json())
      );

      const allMovies = moviesData.flatMap((data) => data.results);

      setTopMovies(allMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Filmes</h2>
      <div className="movies-container">
        {topMovies.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          topMovies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;































































































// const moviesURL = import.meta.env.VITE_API;
// const apiKey = import.meta.env.VITE_API_KEY;

// const Home = () => {
// const [topMovies, setTopMovies] = useState([]);

// const getTopRatedMovies = async (url) => {
// const res = await fetch(url);
// const data = await res.json();

// setTopMovies(data.results);
// };

// useEffect(() => {
//  const topRatedUrl = `${moviesURL}popular?${apiKey}`;
//  getTopRatedMovies(topRatedUrl);
// }, []);

// return (
// <div className="container">
// <h2 className="title">Filmes</h2>
// <div className="movies-container">
// {topMovies.length === 0 && <p>Carregando...</p>}
//  {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
// </div>
// </div>
// );
// };
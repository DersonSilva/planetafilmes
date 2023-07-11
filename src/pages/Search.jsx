// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import MovieCard from "../components/MovieCard";
// import "./MovieGrid.css";

// const Search = () => {
//   const [searchParams] = useSearchParams();
//   const [movies, setMovies] = useState([]);
//   const query = searchParams.get("q");

//   const searchURL = import.meta.env.VITE_SEARCH;
//   const apiKey = import.meta.env.VITE_API_KEY;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const searchApiUrl = `${searchURL}?api_key=${apiKey}&query=${query}&page=1`;
//         const res = await fetch(searchApiUrl);

//         if (res.ok) {
//           const data = await res.json();
//           setMovies(data.results);
//         } else {
//           console.error("Falha na solicitação da API:", res.status);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar filmes:", error);
//       }
//     };

//     fetchMovies();
//   }, [query, apiKey, searchURL]);

//   return (
//     <div className="container">
//       <h2 className="title">
//         Resultados para: <span className="query-text">{query}</span>
//       </h2>
//       <div className="movies-container">
//         {movies.length === 0 && <p>Carregando...</p>}
//         {movies.length > 0 &&
//           movies.map((movie, index) => (
//             <MovieCard key={`${movie.id}-${index}`} movie={movie} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Search;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MovieCarousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const searchURL = import.meta.env.VITE_SEARCH;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchApiUrl = `${searchURL}?api_key=${apiKey}&query=${query}&page=1`;
        const res = await fetch(searchApiUrl);

        if (res.ok) {
          const data = await res.json();
          setMovies(data.results);
        } else {
          console.error("Falha na solicitação da API:", res.status);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, [query, apiKey, searchURL]);

  const settings = {
    dots: true, // Exibe os pontos de navegação
    infinite: true, // Habilita a navegação infinita
    speed: 500, // Velocidade da transição
    slidesToShow: 4, // Número de filmes exibidos por vez
    slidesToScroll: 4 // Número de filmes a serem rolados
  };

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="carousel-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && (
          <Slider {...settings}>
            {movies.map((movie, index) => (
              <div key={`${movie.id}-${index}`}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Search;


























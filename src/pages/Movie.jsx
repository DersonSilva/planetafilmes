import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imagesUrl = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieUrl = `${moviesURL}movie/${id}?api_key=${apiKey}`;
        const response = await fetch(movieUrl);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    const fetchCast = async () => {
      try {
        const castUrl = `${moviesURL}movie/${id}/credits?api_key=${apiKey}`;
        const response = await fetch(castUrl);
        const data = await response.json();
        setCast(data.cast.slice(0, 18)); // Limita para trazer apenas os 12 primeiros atores
      } catch (error) {
        console.error('Erro ao buscar elenco do filme:', error);
      }
    };

    const fetchTrailerKey = async () => {
      try {
        const trailerUrl = `${moviesURL}movie/${id}/videos?api_key=${apiKey}`;
        const response = await fetch(trailerUrl);
        const data = await response.json();
        if (data.results.length > 0) {
          const key = data.results[0].key;
          setTrailerKey(key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error('Erro ao buscar chave do trailer:', error);
      }
    };

    fetchMovieDetails();
    fetchCast();
    fetchTrailerKey();
  }, [id]);

  return (
    <div className="container">
      {movie ? (
        <div className="movie-details-container">
          <h2 className="title">{movie.title}</h2>
          <div className="movie-card">
            <img
              className="movie-image movie-details-image" // Adicione a classe "movie-details-image" aqui
              src={imagesUrl + movie.poster_path}
              alt={movie.title}
            />
            <div className="movie-info">
              <p>
                <strong>Gênero:</strong> {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <p>
                <strong>Classificação:</strong> {movie.vote_average}
              </p>
              <p>
                <strong>Data de Lançamento:</strong> {movie.release_date}
              </p>
              <p className="movie-description">
                <strong>Sinopse:</strong> {movie.overview}
              </p>
            </div>
          </div>
          <div className="cast-container">
            <h3 className='title-elenco'>Elenco</h3>
            <div className="cast-grid">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-item">
                  <img
                    className="actor-image"
                    src={imagesUrl + actor.profile_path}
                    alt={actor.name}
                  />
                  <p className="actor-name">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
          {trailerKey && (
            <div className="trailer-container">
              <iframe
                className="trailer-iframe trailer-video"
                title="Trailer"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Movie;





















































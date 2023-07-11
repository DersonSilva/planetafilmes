import React from 'react';
import { Link } from 'react-router-dom';

const imagesUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img className='movie-image large-image' src={imagesUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      {showLink && (
        <Link to={`/movie/${movie.id}`} className="details-link">
          Detalhes
        </Link>
      )}
    </div>
  );
};

export default MovieCard;












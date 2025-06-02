import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={movie.poster} alt={movie.title} width={150} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
    </div>
  );
}

export default MovieCard;

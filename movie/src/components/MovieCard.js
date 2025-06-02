import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MovieCard.css';
import '../css/Button.css';
import '../css/Form.css';

function MovieCard({ movie, avgRating }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={movie.poster} alt={movie.title} width={150} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>
        평균 별점:
        <span style={{ color: '#ffc107', fontWeight: 'bold', marginLeft: 4 }}>
          {avgRating} / 5
        </span>
      </p>
    </div>
  );
}

export default MovieCard;

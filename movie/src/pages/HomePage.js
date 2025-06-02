import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../services/MovieService';

function HomePage({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h2>영화 목록</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

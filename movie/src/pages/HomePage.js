import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../services/MovieService';
import { getAllReviews } from '../services/ReviewService';

// 평균 별점 가져오기
function getAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, cur) => acc + (cur.rating || 0), 0);
  return (sum / reviews.length).toFixed(1);
}

function HomePage({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState(''); // 검색어 상태 추가

  useEffect(() => {
    getMovies().then(setMovies);
    getAllReviews().then(setReviews);
  }, []);

  // 검색어에 따라 영화 목록 필터링
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>영화 목록</h2>
      <input
        type="text"
        placeholder="영화 제목을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '16px', width: '300px', padding: '8px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const movieReviews = reviews.filter((r) => r.movieId === movie.id);
            const avgRating = getAverageRating(movieReviews);
            return (
              <MovieCard key={movie.id} movie={movie} avgRating={avgRating} />
            );
          })
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import MovieCard from '../Component/MovieCard';
import { getMovies } from '../Service/MovieService';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Component/Header';

function HomePage({ onSelectMovie, wishlist, onToggleWishlist }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('year');
  const [sortOrder, setSortOrder] = useState('desc');
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortKey, sortOrder, minRating]);

  const moviesWithAvgRating = movies.map((movie) => ({
    ...movie,
    avgRating: (Number(movie.rating || 0) / 2).toFixed(1),
  }));

  let filtered = moviesWithAvgRating.filter((movie) =>
    (movie.title || '').toLowerCase().includes(query.toLowerCase())
  );

  filtered = filtered.filter((m) => parseFloat(m.avgRating || 0) >= minRating);

  filtered.sort((a, b) => {
    let aValue, bValue;
    if (sortKey === 'year') {
      aValue = a.year;
      bValue = b.year;
    } else if (sortKey === 'title') {
      aValue = a.title.toLowerCase();
      bValue = b.title.toLowerCase();
    } else if (sortKey === 'rating') {
      aValue = parseFloat(a.avgRating || 0);
      bValue = parseFloat(b.avgRating || 0);
    }
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedMovies = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const delta = 2;
    let range = [];
    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage <= delta + 2) {
      start = 2;
      end = Math.min(2 + delta * 2, totalPages - 1);
    }

    if (currentPage >= totalPages - delta - 1) {
      start = Math.max(totalPages - delta * 2 - 1, 2);
      end = totalPages - 1;
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff' }}>
      <Header
        showSearch={true}
        searchValue={query}
        onSearchChange={setQuery}
      />
      <h2>영화 목록</h2>

      <input
        type="text"
        placeholder="영화 제목을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '16px', width: '300px', padding: '8px' }}
      />

      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => navigate('/wishlist')}>⭐ 즐겨찾기 목록</button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="year">연도순</option>
          <option value="title">제목순</option>
          <option value="rating">평점순</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">내림차순</option>
          <option value="asc">오름차순</option>
        </select>
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>전체</option>
          <option value={3}>3점 이상</option>
          <option value={4}>4점 이상</option>
          <option value={5}>5점</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {paginatedMovies.length > 0 ? (
          paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.id || movie.title}
              movie={movie}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              avgRating={movie.avgRating}
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{ margin: '0 6px', padding: '6px 12px' }}
        >
          ◀ 이전
        </button>

        {/* 첫 페이지 */}
        <button
          onClick={() => setCurrentPage(1)}
          style={{
            margin: '0 4px',
            padding: '6px 10px',
            background: currentPage === 1 ? '#444' : '#222',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          1
        </button>

        {/* 앞쪽 생략 */}
        {getPageNumbers()[0] > 2 && <span style={{ color: '#aaa' }}>...</span>}

        {/* 가운데 페이지들 */}
        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              margin: '0 4px',
              padding: '6px 10px',
              background: currentPage === num ? '#444' : '#222',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {num}
          </button>
        ))}

        {/* 뒤쪽 생략 */}
        {getPageNumbers().slice(-1)[0] < totalPages - 1 && (
          <span style={{ color: '#aaa' }}>...</span>
        )}

        {/* 마지막 페이지 */}
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            style={{
              margin: '0 4px',
              padding: '6px 10px',
              background: currentPage === totalPages ? '#444' : '#222',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{ margin: '0 6px', padding: '6px 12px' }}
        >
          다음 ▶
        </button>
      </div>
    </div>
  );
}

export default HomePage;

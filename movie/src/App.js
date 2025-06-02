import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { getMovies } from './services/MovieService';
import WishlistPage from './pages/WishList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  function Header() {
    return (
      <header>
        <h1>영화 리뷰 플랫폼</h1>
      </header>
    );
  }

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleToggleWishlist = (movieId) => {
    setWishlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              movies={movies}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/MovieService';
import { getReviewsByMovieId, addReview } from '../services/ReviewService';

// 별점 선택 컴포넌트
function StarRating({ value, onChange, totalStars = 5 }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
      {Array.from({ length: totalStars }).map((_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            style={{
              cursor: 'pointer',
              color: starValue <= (hover || value) ? '#ffc107' : '#e4e5e9',
              fontSize: '1.5rem',
              transition: 'color 0.2s',
            }}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            role="button"
            aria-label={`${starValue}점`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getMovieById(Number(id)).then(setMovie);
    getReviewsByMovieId(Number(id)).then(setReviews);
  }, [id]);

  const handleAddReview = () => {
    if (!reviewText.trim() || rating === 0) {
      alert('별점과 리뷰를 모두 입력해주세요.');
      return;
    }
    addReview(Number(id), reviewText, rating).then((newReview) => {
      setReviews((prev) => [...prev, newReview]);
      setReviewText('');
      setRating(0);
    });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} width={200} />
      <p>{movie.description}</p>
      <h3>리뷰</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            {/* 별점 표시 */}
            <span>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  style={{ color: i < (r.rating || 0) ? '#ffc107' : '#e4e5e9' }}
                >
                  ★
                </span>
              ))}
            </span>
            <br></br>
            {r.text}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '16px' }}>
        {/* 별점 선택 */}
        <StarRating value={rating} onChange={setRating} />
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="리뷰를 작성하세요"
          rows={2}
          style={{ width: '50%', marginBottom: '8px', height: '40px' }}
        />
        <br />
        <button onClick={handleAddReview} style={{ marginRight: '8px' }}>
          리뷰 등록
        </button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div>
  );
}

export default MovieDetailPage;

let reviews = [
  // 예시: { id: 1, movieId: 1, text: "재밌어요!", rating: 4 }
];

export function getReviewsByMovieId(movieId) {
  return Promise.resolve(reviews.filter((r) => r.movieId === movieId));
}

export function addReview(movieId, text, rating) {
  const newReview = { id: Date.now(), movieId, text, rating };
  reviews.push(newReview);
  return Promise.resolve(newReview);
}

// 리뷰 가져오는 함수
export function getAllReviews() {
  return Promise.resolve(reviews);
}

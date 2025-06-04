const BASE_URL = "http://localhost:5001/api/reviews";

// 특정 영화 리뷰 가져오기
export function getReviewsByMovieId(movieId) {
  return fetch(`${BASE_URL}/movie/${movieId}`)
    .then((res) => {
      if (!res.ok) throw new Error("리뷰 조회 실패");
      return res.json();
    });
}

// 리뷰 추가하기
export function addReview(movieId, text, rating) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie_id: movieId, content: text, rating }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("리뷰 저장 실패");
      return res.json();
    })
    .then((data) => {
      return {
        id: data.id,
        movieId: movieId,
        text,
        rating,
        likes: 0, 
      };
    });
}

// 리뷰 전부 가져오기
export function getAllReviews() {
  return fetch(BASE_URL)
    .then((res) => {
      if (!res.ok) throw new Error("전체 리뷰 조회 실패");
      return res.json();
    });
}

// 리뷰 삭제
export function deleteReview(reviewId) {
  return fetch(`${BASE_URL}/${reviewId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("리뷰 삭제 실패");
    return;
  });
}

// 리뷰 수정
export function updateReview(reviewId, newText, newRating) {
  return fetch(`${BASE_URL}/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: newText, rating: newRating }),
  }).then((res) => {
    if (!res.ok) throw new Error("리뷰 수정 실패");
    return;
  });
}

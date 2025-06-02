const dummyMovies = [
  {
    id: 1,
    title: '인셉션',
    year: 2010,
    poster: 'https://via.placeholder.com/150',
    description: '꿈을 조종하는 이야기',
  },
  {
    id: 2,
    title: '인터스텔라',
    year: 2014,
    poster: 'https://via.placeholder.com/150',
    description: '우주를 여행하는 이야기',
  },
];

export function getMovies() {
  return Promise.resolve(dummyMovies);
}

export function getMovieById(id) {
  return Promise.resolve(dummyMovies.find((m) => m.id === id));
}

import movies from '../data/movies.json';

export async function getMovies() {
  return movies;  
}

export async function getMovieById(id) {
  return movies.find((m) => m.id === id);
}

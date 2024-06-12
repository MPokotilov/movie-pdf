import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const apiKey = process.env.TMDB_KEY;
console.log('TMDB API Key in tmdb.ts:', apiKey);

if (!apiKey) {
    throw new Error('TMDB_API_KEY is not defined in the environment variables');
}

const baseURL = 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
});

export const getPopularMovies = async () => {
  const response = await tmdbClient.get('/movie/popular');
  return response.data.results;
};

export const getMovieDetails = async (id: string) => {
  const response = await tmdbClient.get(`/movie/${id}`);
  return response.data;
};

import { Router, Request, Response } from 'express';
import { getPopularMovies, getMovieDetails } from './tmdb.js';
import { generateMoviesPDF, generateMovieDetailsPDF } from './pdfGenerator.js';

const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
    console.log('TMDB API Key in routes.ts:', process.env.TMDB_KEY);
  try {
    const movies = await getPopularMovies();
    const pdfBytes = await generateMoviesPDF(movies);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="movies.pdf"');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF for popular movies:', error);
    res.status(500).send('Error generating PDF');
  }
});

router.get('/movies/:id', async (req: Request, res: Response) => {
    console.log('TMDB API Key in routes.ts:', process.env.TMDB_KEY);
  try {
    const movieId = req.params.id;
    const movie = await getMovieDetails(movieId);
    const pdfBytes = await generateMovieDetailsPDF(movie);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="movie-details.pdf"');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error(`Error generating PDF for movie ID ${req.params.id}:`, error);
    res.status(500).send('Error generating PDF');
  }
});

export default router;

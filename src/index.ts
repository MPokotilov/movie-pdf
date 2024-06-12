import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes.js';

console.log('TMDB API Key from .env:', process.env.TMDB_KEY);

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

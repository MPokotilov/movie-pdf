import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fetch from 'node-fetch';

export const generateMoviesPDF = async (movies: any[]): Promise<Uint8Array> => {
  try {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    let y = height - 30;

    page.drawText('Popular Movies', { x: 50, y, size: fontSize + 4, font: timesRomanFont, color: rgb(0, 0, 0) });
    y -= 30;

    for (const movie of movies) {
      const text = `${movie.title} (${movie.release_date}) - Rating: ${movie.vote_average} | Movie ID: ${movie.id}`;
      page.drawText(text, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= 20;
      if (y < 50) {
        const newPage = pdfDoc.addPage();
        y = height - 30;
        newPage.drawText(text, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating Movies PDF:', error);
    throw error;
  }
};

export const generateMovieDetailsPDF = async (movie: any): Promise<Uint8Array> => {
  try {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    let y = height - 30;

    page.drawText(movie.title, { x: 50, y, size: fontSize + 4, font: timesRomanFont, color: rgb(0, 0, 0) });
    y -= 30;

    page.drawText(`Release Date: ${movie.release_date}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
    y -= 20;

    page.drawText(`Rating: ${movie.vote_average}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
    y -= 20;

    if (movie.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const posterImageBytes = await fetch(posterUrl).then(res => res.arrayBuffer());
      const posterImage = await pdfDoc.embedJpg(posterImageBytes);
      page.drawImage(posterImage, {
        x: 50,
        y: y - 200,
        width: 150,
        height: 200,
      });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating Movie Details PDF:', error);
    throw error;
  }
};

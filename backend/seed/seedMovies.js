require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");

const connectDB = require("../src/config/db");
const Movie = require("../src/models/Movie");

async function seedMovies() {
  await connectDB();

  const movies = [];

  fs.createReadStream("./seed/tmdb_movies_2021_2025.csv")
    .pipe(csv())
    .on("data", (row) => {
      movies.push({
        tmdb_id: row.tmdb_id,
        title: row.title,
        original_title: row.original_title,
        release_date: row.release_date,
        genres: row.genres ? row.genres.split("|") : [],
        vote_average: Number(row.vote_average),
        vote_count: Number(row.vote_count),
        popularity: Number(row.popularity),
        original_language: row.original_language,
        overview: row.overview,
        poster_url: row.poster_url,
      });
    })
    .on("end", async () => {
      try {
        await Movie.insertMany(movies);
        console.log(`✅ Inserted ${movies.length} movies`);
        process.exit();
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
}

seedMovies();
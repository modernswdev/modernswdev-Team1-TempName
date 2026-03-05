const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    tmdb_id: { type: Number, required: true, unique: true, index: true },

    title: { type: String, required: true, index: true },
    original_title: { type: String },

    release_date: { type: Date },
    genres: { type: [String], default: [] },

    vote_average: { type: Number, min: 0, max: 10 },
    vote_count: { type: Number, min: 0 },

    popularity: { type: Number, min: 0 },
    original_language: { type: String },

    overview: { type: String },
    poster_url: { type: String },
  },
  { timestamps: true } // gives createdAt + updatedAt automatically
);

module.exports = mongoose.model("Movie", MovieSchema);
const express = require("express");
const Movie = require("../models/Movies.js");
const moviesRouter = express.Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

moviesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movies = await Movie.findById(id);
    if (movies) {
      return res.status(200).json(movies);
    } else {
      return res.status(404).json("No existe una pelicula con ese id");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

moviesRouter.get("/title/:title", async (req, res) => {
  const titleMovie = req.params.title;
  try {
    const movie = await Movie.find({ title: titleMovie });
    if (movie && movie.length > 0) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No existe una pelicula con ese titulo en nuestro archivo.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

moviesRouter.get("/genre/:genre", async (req, res) => {
    const genreMovie = req.params.genre;
    try {
      const movie = await Movie.find({
        genre: {$in: [genreMovie]} 
      });
      return res.status(200).json(movie);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  moviesRouter.get("/from/2010", async (req, res) => {
    try {
        const movie = await Movie.find({
          year: {$gt: 2010} 
        });
        return res.status(200).json(movie);
      } catch (err) {
        return res.status(500).json(err);
      }
  });


module.exports = moviesRouter;

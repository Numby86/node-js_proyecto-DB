const express = require("express");
const Movie = require("../models/Movies.js");
const isAuthJWT = require("../utils/middlewares/auth-jwt.middleware.js");
const isAuthPassport = require("../utils/middlewares/auth-passport.middleware.js");
const moviesRouter = express.Router();

// LA RUTA BASICA TRAE TODAS LAS MOVIES EN ORDEN ALFABETICO

moviesRouter.get("/", [isAuthPassport], async (req, res, next) => {
  try {
    const movies = await Movie.find().sort({title:1});
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// LOS GET QUE PIDE EL EJERCICIO, CON AUTH. PASSPORT

moviesRouter.get("/:id", [isAuthPassport], async (req, res, next) => {
  const id = req.params.id;
  try {
    const movies = await Movie.findById(id);
    if (movies) {
      return res.status(200).json(movies);
    } else {
      return res.status(404).json("No existe una pelicula con ese id");
    }
  } catch (err) {
    return next(err);
  }
});

moviesRouter.get("/title/:title", [isAuthPassport], async (req, res, next) => {
  const titleMovie = req.params.title;
  try {
    const movie = await Movie.find({ title: titleMovie });
    if (movie && movie.length > 0) {
      return res.status(200).json(movie);
    } else {
      return res
        .status(404)
        .json("No existe una pelicula con ese titulo en nuestro archivo.");
    }
  } catch (err) {
    return next(err);
  }
});

moviesRouter.get("/genre/:genre", [isAuthPassport], async (req, res, next) => {
  const genreMovie = req.params.genre;
  try {
    const movie = await Movie.find({
      genre: { $in: [genreMovie] },
    });
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
});

moviesRouter.get("/from/2010", [isAuthPassport], async (req, res, next) => {
  try {
    const movie = await Movie.find({
      year: { $gt: 2010 }
    });
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
});

// AÑADO GET SI PERTENECEN A UNA SAGA, O TIENEN UN OSCAR QUE TE TRAE SOLO ID Y TITULO, CON AUTH. PASSPORT

moviesRouter.get("/saga/true", [isAuthPassport], async (req, res, next) => {
  try {
    const movie = await Movie.find({
      saga: { $eq: true}
    });
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
});

moviesRouter.get("/oscar/winning", [isAuthPassport], async (req, res, next) => {
  try {
    const movie = await Movie.find({
      oscar: { $gt: 0}
    }, {title: 1});
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
});

// CRUD QUE PIDE EL EJERCICIO CON AUTH. DE TOKEN

moviesRouter.post("/", [isAuthJWT], async (req, res, next) => {
  try {
    const newMovie = new Movie({ ...req.body });
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    next(err);
  }
});

moviesRouter.delete("/:id", [isAuthJWT], async (req, res, next) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json('La pelicula se elimino correctamente. ');
  } catch (err) {
    next(err);
  }
});

moviesRouter.put('/:id', [isAuthJWT], async (req, res, next) => {
  try {
      const id = req.params.id;
      const modifiedMovie = new Movie({ ...req.body });
      modifiedMovie._id = id;
      const movieUpdated = await Movie.findByIdAndUpdate(
          id,
          { $set: { ...modifiedMovie }},
          { new: true }
      );
      return res.status(200).json(movieUpdated);
  } catch (err) {
      next(err);
  }
});

module.exports = moviesRouter;

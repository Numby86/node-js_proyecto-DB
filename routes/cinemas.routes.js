const express = require('express');
const Cinema = require('../models/Cinemas.js');
const createError = require('../utils/errors/create-errors.js');
const isAuthJWT = require('../utils/middlewares/auth-jwt.middleware.js');
const upload = require('../utils/middlewares/file.middleware.js');
const imageToUri = require('image-to-uri');
const fs = require('fs');
const uploadToCloudinary = require('../utils/middlewares/cloudinary.middleware.js');
const isAuthPassport = require('../utils/middlewares/auth-passport.middleware.js');

const cinemasRouter = express.Router();

cinemasRouter.get('/',isAuthPassport , async (req, res, next) => {
    try {
        const cinemas = await Cinema.find().populate('moviesBillboard');
        return res.status(200).json(cinemas);
    } catch (err) {
        next(err);
    }
});

cinemasRouter.post('/create', [isAuthJWT, upload.single('picture')], async (req, res, next) => {
    try {
        const picture = req.file ? req.file.filename : null;
        const newCinema = new Cinema({ ...req.body, picture });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err);
    }
});

cinemasRouter.post('/uri', [isAuthJWT, upload.single('picture')], async (req, res, next) => {
    try {
        const filePath = req.file ? req.file.path : null;
        const picture = imageToUri(filePath);
        const newCinema = new Cinema({ ...req.body, picture });
        const createdCinema = await newCinema.save();
        await fs.unlinkSync(filePath);
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err);
    }
});

cinemasRouter.post('/cloudinary', [upload.single('picture'), uploadToCloudinary], async (req, res, next) => {
    try {
        const newCinema = new Cinema({ ...req.body, picture: req.file_url });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err);
    }
});

cinemasRouter.delete('/:id', [isAuthJWT], async (req, res, next) => {
    try {
        const id = req.params.id;
        await Cinema.findByIdAndDelete(id);
        return res.status(200).json('El cine ha sido eliminado correctamente');
    } catch (err) {
        next(err);
    }
});

cinemasRouter.put('/add-moviesBillboard', [isAuthJWT], async (req, res, next) => {
    try {
        const { cinemaId, movieId } = req.body;
        if (!cinemaId) {
            return next(createError('Se necesita la id del Cine, para poder añadir peliculas a la cartelera. '))
        }
        if (!movieId) {
            return next(createError('Se necesita la id de la pelicula, para que la podamos añadir. '))
        }
        const updateCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { moviesBillboard: movieId } },
            { new: true }
        );
        return res.status(200).json(updateCinema);
    } catch (err) {
        next(err);
    }
});

cinemasRouter.put('/update/:id', [isAuthJWT], async (req, res, next) => {
    try {
        const id = req.params.id;
        const modifiedCinema = new Cinema({ ...req.body });
        modifiedCinema._id = id;
        const cinemaUpdated = await Cinema.findByIdAndUpdate(
            id,
            { $set: { ...modifiedCinema }},
            { new: true }
        );
        return res.status(200).json(cinemaUpdated);
    } catch (err) {
        next(err);
    }
});

module.exports = cinemasRouter;
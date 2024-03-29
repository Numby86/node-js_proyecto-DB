const express = require("express");
const Personaje = require("../models/Personaje");
const personajeRouter = express.Router();
const isAuthJWT = require("../utils/middlewares/auth-jwt.middleware.js");
const isAuthPassport = require("../utils/middlewares/auth-passport.middleware.js");
const createError = require('../utils/errors/create-errors.js');

personajeRouter.get("/", async(req, res, next) => {
    try {
        const personajes = await Personaje.find();
        return res.status(200).json(personajes);
    } catch (err) {
        return next(err);
    }
})

personajeRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const personajes = await Personaje.findById(id);
      if (personajes) {
        return res.status(200).json(personajes);
      } else {
        return res.status(404).json("No existe un personaje con ese id");
      }
    } catch (err) {
      return next(err);
    }
});

personajeRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Personaje.findByIdAndDelete(id);
    return res.status(200).json('El personaje se elimino correctamente. ');
  } catch (err) {
    next(err);
  }
});

personajeRouter.post("/", async(req, res, next) => {
    try {
        const newPersonaje = new Personaje({ ...req.body });
        const createdPersonaje = await newPersonaje.save();
        return res.status(201).json(createdPersonaje);
    } catch (err) {
        next(err);
    }
});

personajeRouter.put('/:id', async (req, res, next) => {
  try {
      const id = req.params.id;
      const modifiedPersonaje = new Personaje({ ...req.body });
      modifiedPersonaje._id = id;
      const personajeUpdated = await Personaje.findByIdAndUpdate(
          id,
          { $set: { ...modifiedPersonaje }},
          { new: true }
      );
      return res.status(200).json(personajeUpdated);
  } catch (err) {
      next(err);
  }
});

module.exports = personajeRouter;
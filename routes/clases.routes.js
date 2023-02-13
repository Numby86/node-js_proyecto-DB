const express = require("express");
const Class = require("../models/Clases.js");
const classRouter = express.Router();
const isAuthJWT = require("../utils/middlewares/auth-jwt.middleware.js");
const isAuthPassport = require("../utils/middlewares/auth-passport.middleware.js");
const createError = require('../utils/errors/create-errors.js');

classRouter.get("/", async(req, res, next) => {
    try {
        const clases = await Class.find();
        return res.status(200).json(clases);
    } catch (err) {
        return next(err);
    }
})

classRouter.post("/", async(req, res, next) => {
    try {
        const newClase = new Class({ ...req.body });
        const createdClass = await newClase.save();
        return res.status(201).json(createdClass);
    } catch (err) {
        next(err);
    }
});

module.exports = classRouter;
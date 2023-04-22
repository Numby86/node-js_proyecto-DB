const express = require('express');
const Loader = require('../models/Loaders.js');

const cartsRouter = express.Router();

loadersRouter.get('/', async (req, res, next) => {
    try {
        const allLoaders = await Loader.find().populate('products');
        return res.status(200).json(allLoaders);
    } catch (err) {
        next(err);
    }
});

loadersRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const loader = await Loader.findById(id);
        if (loader) {
            return res.status(200).json(loader);
        } else {
            return res.status(404).json('No existe un loader con el id indicado');
        }
        
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = cartsRouter;
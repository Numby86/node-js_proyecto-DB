const mongoose = require('mongoose');

const loaderSchema = new mongoose.Schema(
    {
        html: { type: String },
        scss: { type: String }
    },
    {
        timestamps: true
    }
);

const Loader = mongoose.model('Loader', loaderSchema);

module.exports = Loader;
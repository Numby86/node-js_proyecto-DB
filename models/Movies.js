const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, unique: true, required: true },
        director: { type: String, required: true },
        year: { type: Number, min: [1895, 'No existian peliculas aun en ese año. '], max: [2022, 'Estamos en 2022, esa pelicula aun no se ha estrenado. '] },
        genre: {
            type: [String],
            enum: {
                values: ["Animacion", "Anime", "Accion", "Aventuras", "Belica", "Ciencia Ficcion", "Comedia", "Cortometraje", "Crimen", "Deportiva", "Documental", "Drama", "Familiar", "Fantasia", "Futurista", "Historica", "Musical", "Policiaca", "Religiosa", "Romantica", "Suspense", "Terror", "Western"],
                message: "Ese no es un genero oficial en nuestra pagina. "
            }
        }, 
        saga: Boolean,
        duration: {type: Number}
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

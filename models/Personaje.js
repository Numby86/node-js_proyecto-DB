const mongoose = require("mongoose");

const personajeSchema = new mongoose.Schema(
    {
        name: String,
        edad: Number,
        image: String,
        complexion: {type: [String],
        enum: {
            values: ["Normal", "Delgado", "Fuerte"],
    }},
        recuerdo: {type: [String],
            enum: {
                values: ["Ninguno",
                "Medallon de ambar rojo",
                "Runa de las tierras intermedias",
                "Semilla dorada",
                "Cenizas de diablo colmilludo",
                "Tarro agrietado",
                "LLave de la espada petrea",
                "Rama cautivadora",
                "Gambon conocido",
                "Pesar de Shabriri"],
        }},
        claseName: {type: [String],
            enum: {
                values: ["Hero",
                "Warrior",
                "Astrologer",
                "Bandit",
                "Prisoner",
                "Vagabond",
                "Confessor",
                "Wretch",
                "Prophet",
                "Samurai"],
        }},
        clase: {
            id: Number,
            name: String,
            image: String,
            description: String,
            stats: 
              {
                level: Number,
                vigor: Number,
                mind: Number,
                endurance: Number,
                strength: Number,
                dexterity: Number,
                intelligence: Number,
                faith: Number,
                arcane: Number,
              },
          
          }
}
);

const Personaje = mongoose.model('Personaje', personajeSchema);

module.exports = Personaje;

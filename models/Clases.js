const mongoose = require("mongoose");

const clasesSchema = new mongoose.Schema({
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

});

const Class = mongoose.model('Class', clasesSchema);

module.exports = Class;
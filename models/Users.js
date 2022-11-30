const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "El email no tiene un formato valido."]},
    password: {type: String, require: true }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
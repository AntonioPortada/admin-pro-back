const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    img: { type: String },
    roles: { type: String, require: true, default: 'USER_ROL' },
    google: { type: Boolean, default: false }
});

module.exports = model( 'Usuario', UsuarioSchema );
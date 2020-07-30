const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    usuario: String,
    email: String,
    estado: {
        type: Boolean,
        default: true
    },
    password: String
});

module.exports = mongoose.model('usuarios', UsuarioSchema);
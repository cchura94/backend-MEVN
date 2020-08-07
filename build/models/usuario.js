"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UsuarioSchema = new Schema({
  usuario: String,
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  password: String
});
module.exports = mongoose.model('usuarios', UsuarioSchema);
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductoSchema = Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    },
    detalle: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model("productos", ProductoSchema)
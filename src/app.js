// Importar modulos
import express from "express";
//const express = require("express");`
import mongoose from "mongoose";
//const mongoose = require("mongoose");
import morgan from "morgan"
//const morgan = require("morgan");

const config = require("./config/config");

// Importar rutas
const router = require("./routes/index");

// Conectar la con MongoDB base de datos
mongoose
    .connect("mongodb://localhost:27017/test2", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((db) => {
        console.log("MONGODB CONECTADO...");
    })
    .catch((error) => {
        console.log("ERROR DE CONEXION MONGODB ...");
    });

// Configuración
var app = express();
app.set("port", process.env.PORT || config.PORT);
// Middlewares
app.use(morgan("dev"));
//Habilitar Peticiones en formato json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


// Rutas
router.add(app);
// levantar el servidor
app.listen(app.get("port"), () => {
    console.log(`Servidor levantado en puerto: ${app.get("port")}`);
});
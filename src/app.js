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

//Habilitar carga de archivos estaticos
app.use(express.static('public'))
// Middlewares
app.use(morgan("dev"));
//Habilitar Peticiones en formato json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// CORS Agregar encabezados (headers)
app.use(function (req, res, next) {
    //Sitio web al que se desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', '*');

    // habilitar los encabezados que desea permitir
    res.setHeader('Access-Control-Allow-Headers', 'content-type, X-Requested-With, Authorization');

    // habilitar los Metodos que desea permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

    next();
});

// Rutas
router.add(app);
// levantar el servidor
app.listen(app.get("port"), () => {
    console.log(`Servidor levantado en puerto: ${app.get("port")}`);
});
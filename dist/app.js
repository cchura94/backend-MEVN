"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Importar modulos
//const express = require("express");`
//const mongoose = require("mongoose");
//const morgan = require("morgan");
const config = require("./config/config"); // Importar rutas


const router = require("./routes/index"); // Conectar la con MongoDB base de datos


_mongoose.default.connect("mongodb://localhost:27017/test2", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  console.log("MONGODB CONECTADO...");
}).catch(error => {
  console.log("ERROR DE CONEXION MONGODB ...");
}); // Configuración


var app = (0, _express.default)();
app.set("port", process.env.PORT || config.PORT); // Middlewares

app.use((0, _morgan.default)("dev")); //Habilitar Peticiones en formato json

app.use(_express.default.json()); // for parsing application/json

app.use(_express.default.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
// Rutas

router.add(app); // levantar el servidor

app.listen(app.get("port"), () => {
  console.log(`Servidor levantado en puerto: ${app.get("port")}`);
});
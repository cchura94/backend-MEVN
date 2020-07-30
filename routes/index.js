const Usuario = require("./../models/usuario");
const usuarioController = require("../controllers/usuarioController");

module.exports.add = (app) => {
    app.get("/", (req, res) => {
        res.send("Hola Mundo");
    });

    app.get("/test", (req, res) => {
        res.send("Esta es una prueba");
    });

    app.get("/usuario", usuarioController.listar); // Listar

    app.post("/usuario", usuarioController.guardar); //Guardar
    app.get("/usuario/:id", usuarioController.mostrar); //Mostrar
    app.put("/usuario/:id", usuarioController.modificar); //Mostrar
};
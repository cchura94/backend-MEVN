const Usuario = require("./../models/usuario");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

module.exports.add = (app) => {
  app.get("/", (req, res) => {
    res.send("Hola Mundo");
  });

  app.get("/test", (req, res) => {
    res.send("Esta es una prueba");
  });

  app.get("/usuario", authMiddleware.verificaAuth, usuarioController.listar); // Listar
  app.post("/usuario", authMiddleware.verificaAuth, usuarioController.guardar); //Guardar
  app.get("/usuario/:id", authMiddleware.verificaAuth, usuarioController.mostrar); //Mostrar
  app.put("/usuario/:id", authMiddleware.verificaAuth, usuarioController.modificar); //Modificar
  app.delete("/usuario/:id", authMiddleware.verificaAuth, usuarioController.eliminar); //Eliminar

  // Inicio de Sesion
  app.post("/ingresar", authController.ingresar); //Inicio de sesion
};
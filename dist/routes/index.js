"use strict";

const Usuario = require("./../models/usuario");

const usuarioController = require("../controllers/usuarioController");

const clienteController = require("../controllers/clienteController");

const productoController = require("../controllers/productoController");

const pedidoController = require("../controllers/pedidoController");

const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/auth");

module.exports.add = app => {
  app.get("/", (req, res) => {
    res.send("Hola Mundo con babel cambiado prueba");
  });
  app.get("/test", (req, res) => {
    res.send("Esta es una prueba");
  }); // Rutas de Usuarios

  app.get("/usuario", authMiddleware.verificaAuth, usuarioController.listar); // Listar

  app.post("/usuario", authMiddleware.verificaAuth, usuarioController.guardar); //Guardar

  app.get("/usuario/:id", authMiddleware.verificaAuth, usuarioController.mostrar); //Mostrar

  app.put("/usuario/:id", authMiddleware.verificaAuth, usuarioController.modificar); //Modificar

  app.delete("/usuario/:id", authMiddleware.verificaAuth, usuarioController.eliminar); //Eliminar
  // Inicio de Sesion

  app.post("/ingresar", authController.ingresar); //Inicio de sesion
  // Rutas de Cliente.

  app.get("/cliente", authMiddleware.verificaAuth, clienteController.listar);
  app.post("/cliente", authMiddleware.verificaAuth, clienteController.guardar);
  app.get("/cliente/:id", authMiddleware.verificaAuth, clienteController.mostrar);
  app.put("/cliente/:id", authMiddleware.verificaAuth, clienteController.modificar);
  app.delete("/cliente/:id", authMiddleware.verificaAuth, clienteController.eliminar); // Rutas de Productos.

  app.get("/producto", authMiddleware.verificaAuth, productoController.listar);
  app.post("/producto", authMiddleware.verificaAuth, productoController.guardar);
  app.get("/producto/:id", authMiddleware.verificaAuth, productoController.mostrar);
  app.put("/producto/:id", authMiddleware.verificaAuth, productoController.modificar);
  app.delete("/producto/:id", authMiddleware.verificaAuth, productoController.eliminar); // Rutas de Pedidos

  app.post("/pedido", authMiddleware.verificaAuth, pedidoController.guardar);
  app.get("/pedido/", authMiddleware.verificaAuth, pedidoController.listar);
  app.get("/pedido/:id", authMiddleware.verificaAuth, pedidoController.mostrar);
  app.put("/pedido/:id", authMiddleware.verificaAuth, pedidoController.editar);
  app.delete("/pedido/:id", authMiddleware.verificaAuth, pedidoController.eliminar);
};
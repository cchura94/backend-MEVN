"use strict";

const cliente = require("./../models/Cliente");

async function listar(req, res, next) {
  const clientes = await cliente.find();
  res.json(clientes);
}

async function guardar(req, res, next) {
  var clie = new cliente(req.body);
  await clie.save();
  res.json({
    mensaje: "cliente registrado"
  });
}

async function mostrar(req, res, next) {
  try {
    let id = req.params.id;
    const clie = await cliente.findById(id);

    if (clie) {
      res.json(user);
    } else {
      res.json({
        mensaje: "cliente no encontrado"
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      mensaje: "No funciona"
    });
  }
}

async function modificar(req, res, next) {
  try {
    let id = req.params.id;
    const clie = await cliente.findById(id);

    if (clie) {
      //modificamos
      console.log(clie);
      cliente.findByIdAndUpdate(clie._id, req.body);
      res.json({
        mensaje: "cliente modificado"
      });
    } else {
      res.json({
        mensaje: "cliente no encontrado"
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      mensaje: "No funciona"
    });
  }
}

async function eliminar(req, res, next) {
  let id = req.params.id;
  await cliente.remove({
    _id: id
  });
  res.json({
    mensaje: "cliente eliminado"
  });
}

module.exports = {
  listar,
  guardar,
  mostrar,
  modificar,
  eliminar
};
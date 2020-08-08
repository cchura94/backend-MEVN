"use strict";

const Pedido = require("../models/Pedido");

async function listar(req, res, next) {
  try {
    const pedidos = await Pedido.find().populate("cliente").populate({
      path: 'pedido.producto',
      model: 'productos'
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
}

async function guardar(req, res, next) {
  try {
    const ped = new Pedido(req.body);
    await ped.save();
    res.json({
      mensaje: "Pedido Registrado"
    });
  } catch (error) {
    console.log(error);
    next();
  }
}

async function mostrar(req, res, next) {
  let id = req.params.id;

  try {
    const pedido = await Pedido.findById(id).populate("cliente").populate({
      path: 'pedido.producto',
      model: 'productos'
    });

    if (!pedido) {
      res.json({
        mensaje: 'El pedido no existe'
      });
    }

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
}

async function editar(req, res, next) {
  let id = req.params.id;

  try {
    const pedido = await Pedido.findOneAndUpdate({
      _id: id
    }, req.body).populate("cliente").populate({
      path: 'pedido.producto',
      model: 'productos'
    });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
}

async function eliminar(req, res, next) {
  let id = req.params.id;

  try {
    const pedido = await Pedido.findOneAndDelete({
      _id: id
    });
    res.json({
      mensaje: "El pedido se ha eliminado"
    });
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = {
  guardar,
  listar,
  mostrar,
  editar,
  eliminar
};
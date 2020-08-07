"use strict";

const Pedido = require("../models/Pedido");

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

module.exports = {
  guardar,
  listar
};
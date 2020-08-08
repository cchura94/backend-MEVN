"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PedidoSchema = Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: 'clientes'
  },
  pedido: [{
    producto: {
      type: Schema.ObjectId,
      ref: 'productos'
    },
    cantidad: Number
  }],
  monto_total: {
    type: Number
  }
});
module.exports = mongoose.model("pedidos", PedidoSchema);
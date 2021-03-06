"use strict";

var jwt = require("jsonwebtoken");

var config = require("./../config/config");

const verificaAuth = (req, res, next) => {
  var token = req.headers['token'];
  console.log(token);

  if (!token) {
    return res.status(403).send({
      auth: false,
      mensaje: "No se proporcionó el token de seguridad"
    });
  }

  jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(500).send({
      auth: false,
      mensaje: "Error de Autenticación"
    });
    /*req.user = {
        usuario: decoded.usuario,
        id: decoded._id
    }*/

    next();
  });
};

module.exports = {
  verificaAuth
};
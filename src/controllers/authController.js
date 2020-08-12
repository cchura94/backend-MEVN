const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const usuario = require("../models/usuario");
const config = require("../config/config");

async function ingresar(req, res) {
    const user = await usuario.findOne({
        email: req.body.email
    });
    if (!user) {
        res.json({
            mensaje: "Usuario Incorrecto",
            error: true
        })
    } else {
        const valor = await bcrypt.compare(req.body.password, user.password);
        if (valor) {

            const payload = {
                username: user.usuario,
                id: user._id,
                time: new Date()
            }
            var token = jwt.sign(payload, config.JWT_SECRET, {
                expiresIn: config.JWT_TIEMPO
            });

            res.json({
                access_token: token,
                usuario: {
                    id: user._id,
                    usuario: user.usuario,
                    email: user.email,
                    fecha: new Date()
                },
                error: false
            })
        } else {
            res.json({
                mensaje: "Contraseña Incorrecta",
                error: true
            })
        }
    }
}

module.exports = {
    ingresar
}
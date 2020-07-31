const bcrypt = require("bcrypt")
const usuario = require("../models/usuario")

async function ingresar(req, res) {
    const user = await usuario.findOne({
        email: req.body.email
    });
    if (!user) {
        res.json({
            mensaje: "Usuario Incorrecto"
        })
    } else {
        const valor = await bcrypt.compare(req.body.password, user.password);
        if (valor) {
            res.json({
                mensaje: "Bienvenido usuario"
            })
        } else {
            res.json({
                mensaje: "Contraseña Incorrecta"
            })
        }
    }
}

module.exports = {
    ingresar
}
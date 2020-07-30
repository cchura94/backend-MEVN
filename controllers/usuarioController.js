const usuario = require("../models/usuario")

// Listar
function listar(req, res) {
    usuario.find().then((datos) => {
        console.log(datos)
        res.json(datos);
    });
}
// Guardar
function guardar(req, res) {
    var c = req.body.email;

    usuario.find({
        email: c
    }).then((user) => {
        if (user.length > 0) {
            return res.json({
                mensaje: "El correo ya está registrado"
            })
        } else {
            var us = new usuario(req.body);
            us.save().then(() => {
                return res.json({
                    mensaje: "usuario registrado"
                })
            });

        }
    })
}
// Mostrar por _id
function mostrar(req, res) {
    var id = req.params.id
    usuario.findById(id).then(user => {
        if (user) {
            return res.json(user);
        } else {
            return res.json({
                mensaje: "usuario no encontrado"
            })
        }
    }).catch(err => {
        console.log(err);
        return res.send("404")
    });
    /*return res.json({
        mensaje: "usuario no existe"
    })*/

}
// Modificar por _id
function modificar(req, res) {
    var id = req.params.id
    usuario.update({
        _id: id
    }, req.body).then(() => {
        return res.json({
            mensaje: "usuario modificamos"
        })
    })
}
// Eliminar por _id
function eliminar(req, res) {

}
// Exportar las funciones

module.exports = {
    listar,
    guardar,
    modificar,
    mostrar,
    eliminar
}
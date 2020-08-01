var bcrypt = require("bcrypt");

const usuario = require("../models/usuario");

// Listar
async function listar(req, res) {
  const datos = await usuario.find();
  res.json(datos);
}
// Guardar
async function guardar(req, res) {
  var c = req.body.email;

  const user = await usuario.find({
    email: c,
  });

  if (user.length > 0) {
    res.json({
      mensaje: "El correo ya está registrado",
    });
  } else {
    try {
      var objUsuario = {};
      var BCRYPT_SALT_ROUNDS = 12;
      const pass = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);

      /*objUsuario = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: pass,
      };*/
      req.body.password = pass;
      var us = new usuario(req.body);
      await us.save();

      res.json({
        mensaje: "usuario registrado",
      });
    } catch (err) {
      console.log(err);
    }
  }
}
// Mostrar por _id
async function mostrar(req, res) {
  try {
    var id = req.params.id;

    const user = await usuario.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.json({
        mensaje: "usuario no encontrado",
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      mensaje: "No funciona",
    });
  }
}
// Modificar por _id
async function modificar(req, res) {
  var id = req.params.id;
  await usuario.update(
    {
      _id: id,
    },
    req.body
  );

  res.json({
    mensaje: "usuario modificado",
  });
}
// Eliminar por _id
async function eliminar(req, res) {
  var id = req.params.id;
  await usuario.remove({
    _id: id,
  });

  res.json({
    mensaje: "usuario eliminado",
  });
}
// Exportar las funciones

module.exports = {
  listar,
  guardar,
  modificar,
  mostrar,
  eliminar,
};

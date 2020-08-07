const producto = require("./../models/Producto");

async function listar(req, res, next) {
    const productos = await producto.find();
    res.json(productos)
}

async function guardar(req, res, next) {
    var prod = new producto(req.body);
    try {
        await prod.save();

        res.json({
            mensaje: "producto registrado",
        });
    } catch (err) {
        console.log(err);
        res.json({
            mensaje: "error al guardar el producto",
        });
    }

}

async function mostrar(req, res, next) {
    try {
        let id = req.params.id;
        const prod = await producto.findById(id);
        if (prod) {
            res.json(prod);
        } else {
            res.json({
                mensaje: "producto no encontrado"
            });
        }
    } catch (error) {
        res.json({
            status: 404,
            mensaje: "No funciona",
        });
    }
}

async function modificar(req, res, next) {
    try {
        let id = req.params.id;
        const prod = await producto.findById(id);
        if (prod) {
            //modificamos
            console.log(req.body)
            await producto.findByIdAndUpdate(prod._id, req.body)
            console.log(prod)
            res.json({
                mensaje: "producto modificado",
            });
        } else {
            res.json({
                mensaje: "producto no encontrado"
            });
        }
    } catch (error) {
        res.json({
            status: 404,
            mensaje: "No funciona",
        });
    }
}

async function eliminar(req, res, next) {
    let id = req.params.id;
    await producto.remove({
        _id: id,
    });

    res.json({
        mensaje: "producto eliminado",
    });
}

module.exports = {
    listar,
    guardar,
    mostrar,
    modificar,
    eliminar
}
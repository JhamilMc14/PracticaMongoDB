const { response } = require('express');

const Producto = require('../models/producto.model');

const getProductos = async(req, res = response) => {

    const productos = await Producto.find()
        .populate('usuario', 'nombre img')
        .populate('proveedor', 'nombre img')

    res.json({
        ok: true,
        productos
    })
}
const crearProducto = async(req, res = response) => {

    const uid = req.uid;
    const producto = new Producto({
        usuario: uid,
        ...req.body
    });

    try {

        const productoDB = await producto.save();

        res.json({
            ok: true,
            producto: productoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar el nuevo producto, consulte con su administrador'
        })
    }

}
const actualizarProducto = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'Productoo no encontrado por id',
            });
        }

        const cambiosProducto = {
            ...req.body,
            usuario: uid
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, cambiosProducto, { new: true });


        res.json({
            ok: true,
            producto: productoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el producto, consulte con el administrador'
        })
    }

}
const eliminarProducto = async(req, res = response) => {

    const id = req.params.id;

    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'El producto no fue encontrado por su id',
            });
        }

        await Producto.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El producto se ha eliminado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el producto, consulte con su administrador'
        })
    }
}

module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto

}
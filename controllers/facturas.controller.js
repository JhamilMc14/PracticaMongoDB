const { response } = require('express');

const Factura = require('../models/factura.model')

const getFacturas = async(req, res = response) => {

    const factura = await Factura.find()
        .populate('usuario', 'nombre img')
        .populate('producto', 'nombre img')

    res.json({
        ok: true,
        factura
    })
}
const crearFactura = async(req, res = response) => {

    const uid = req.uid;
    const factura = new Factura({
        usuario: uid,
        ...req.body
    });

    try {

        const facturaDB = await factura.save();

        res.json({
            ok: true,
            factura: facturaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar laa factura, consulte con el administrador'
        })
    }

}
const actualizarFactura = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const factura = await Factura.findById(id);

        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'Factura no encontrado por su id',
            });
        }

        const cambiosFactura = {
            ...req.body,
            usuario: uid
        }

        const facturaActualizado = await Factura.findByIdAndUpdate(id, cambiosFactura, { new: true });


        res.json({
            ok: true,
            factura: facturaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el factura, consulte con el administrador'
        })
    }

}
const eliminarFactura = async(req, res = response) => {

    const id = req.params.id;

    try {

        const factura = await Factura.findById(id);

        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'Factura no encontrado por su id asignada',
            });
        }

        await Factura.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Factura se ha eliminado correctamente de la BD'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el factura consulte con el administrador'
        })
    }
}


module.exports = {
    getFacturas,
    crearFactura,
    actualizarFactura,
    eliminarFactura

}
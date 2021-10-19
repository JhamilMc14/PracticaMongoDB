const { response } = require('express');
const Proveedor = require('../models/proveedor.model');

const getProveedor = async(req, res = response) => {

    const proveedores = await Proveedor.find()
        .populate('usuario', 'nombre img')
        .populate('ciudad', 'nombre img')


    res.json({
        ok: true,
        proveedores: proveedores
    })
}
const crearProveedor = async(req, res = response) => {

    //console.log(req.body);
    const { email, nombre } = req.body;

    try {

        const existeEmail = await Proveedor.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Proveedor
        const proveedor = new Proveedor(req.body);

        //indicamos a mongoose que registre al proveedor en la bd
        await proveedor.save();


        res.json({
            ok: true,
            proveedor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarProveedor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({
                ok: true,
                msg: 'Proveedor no encontrado por id',
            });
        }

        const cambiosProveedor = {
            ...req.body,
            usuario: uid
        }

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, cambiosProveedor, { new: true });


        res.json({
            ok: true,
            proveedor: proveedorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar datos del proveedor, consulte con el administrador'
        })
    }

}
const eliminarProveedor = async(req, res = response) => {

    const id = req.params.id;

    try {

        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({
                ok: true,
                msg: 'Proveedor no encontrado por id',
            });
        }

        await Proveedor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Proveedor borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Proveedor no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor

}
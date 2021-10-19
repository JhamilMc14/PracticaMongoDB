const { response } = require('express');

const Cliente = require('../models/clientes.model');

const getClientes = async(req, res = response) => {

    const clientes = await Cliente.find()
        .populate('usuario', 'nombre img')
        .populate('producto', 'nombre img')


    res.json({
        ok: true,
        clientes: clientes
    })
}
const crearClientes = async(req, res = response) => {

    const uid = req.uid;
    const cliente = new Cliente({
        usuario: uid,
        ...req.body
    });


    try {

        const clienteDB = await cliente.save();


        res.json({
            ok: true,
            cliente: clienteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear al nuevo cliente, consulte con su administrador'
        })
    }


}

const actualizarClientes = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'cliente no encontrado por id',
            });
        }

        const cambiosCliente = {
            ...req.body,
            usuario: uid
        }

        const clienteActualizado = await Cliente.findByIdAndUpdate(id, cambiosCliente, { new: true });


        res.json({
            ok: true,
            cliente: clienteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar al cliente, consulte con su administrador'
        })
    }

}

const eliminarCliente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no encontrado por id',
            });
        }

        await Cliente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Cliente borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Cliente no puede eliminarse, consulte con su administrador'
        })
    }

}

module.exports = {
    getClientes,
    crearClientes,
    actualizarClientes,
    eliminarCliente


}
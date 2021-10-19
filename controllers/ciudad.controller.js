const { response } = require('express');

const Ciudad = require('../models/ciudad.model');
const getCiudad = async(req, res = response) => {

    const ciudades = await Ciudad.find()

    res.json({
        ok: true,
        ciudades: ciudades
    })
}
const crearCiudad = async(req, res = response) => {

    const uid = req.uid;
    const ciudad = new Ciudad({
        usuario: uid,
        ...req.body
    });


    try {

        const ciudadDB = await ciudad.save();


        res.json({
            ok: true,
            ciudad: ciudadDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear esta ciudad, consulte con su administrador'
        })
    }


}
const actualizarCiudad = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const ciudad = await Ciudad.findById(id);

        if (!ciudad) {
            return res.status(404).json({
                ok: true,
                msg: 'ciudad no encontrada por su id',
            });
        }

        const cambiosCiudad = {
            ...req.body,
            usuario: uid
        }

        const ciudadActualizado = await Ciudad.findByIdAndUpdate(id, cambiosCiudad, { new: true });


        res.json({
            ok: true,
            ciudad: ciudadActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar información de la ciudad, consulte con su administrador'
        })
    }

}
const eliminarCiudad = async(req, res = response) => {

    const id = req.params.id;

    try {

        const ciudad = await Ciudad.findById(id);

        if (!ciudad) {
            return res.status(404).json({
                ok: true,
                msg: 'Ciudad no encontrado por id',
            });
        }

        await Ciudad.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Ciudad borrada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Esta ciudad no puede eliminarse, consulte con su administrador'
        })
    }

}
module.exports = {
    getCiudad,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad

}
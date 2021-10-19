//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const cliente = require('../models/clientes.model');
const Producto = require('../models/producto.model');



const busquedaTotal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    const [usuarios, clientes, productos] = await Promise.all([
        Usuario.find({ nombre: miRegExp }), // la busqueda es por nombre
        cliente.find({ nombre: miRegExp }),
        Producto.find({ nombre: miRegExp })
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios,
        clientes,
        productos
    });

}

//estructura de la peticion 
const busquedaColeccion = async(req, res = response) => {

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({ nombre: miRegExp })

            break;
        case 'proyectos':
            data = await Producto.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img');
            break;
        case 'investigadores':
            data = await cliente.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img')
                .populate('proyecto', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/proyectos/investigadores"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });

}





module.exports = {
    busquedaTotal,
    busquedaColeccion
}
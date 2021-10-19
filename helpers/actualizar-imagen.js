const fs = require('fs'); //para leer archivos y carpetas del filesystem
const Usuario = require('../models/usuario.model');
const Producto = require('../models/producto.model');
const Cliente = require('../models/clientes.model');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipoColeccion, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipoColeccion) {
        case 'clientes':
            const cliente = await Cliente.findById(id);
            if (!cliente) {
                console.log('Id de cliente no encontrado');
                return false;
            }
            pathViejo = `./uploads/clientes/${cliente.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            cliente.img = nombreArchivo;
            await cliente.save();
            return true;
            break;

        case 'productos':
            const producto = await Producto.findById(id);
            if (!producto) {
                console.log('Id de producto no encontrado');
                return false;
            }
            pathViejo = `./uploads/productos/${producto.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            producto.img = nombreArchivo;
            await producto.save();
            return true;

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('Id de usuario no encontrado');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}
const { Schema, model, SchemaTypes } = require('mongoose');

//Definicion del esquema para la coleccion de proveedor

const ProveedorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false

    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    ciudad: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Ciudad'
    }
}, { collection: 'proveedores' });
//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id
ProveedorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model('Proveedor', ProveedorSchema);
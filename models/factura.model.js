const { Schema, model, SchemaTypes } = require('mongoose');

const FacturaSchema = Schema({
    numero: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }
}, { collection: 'facturas' });

//Este cambio es solo para fines visuales, la bd permanece con _id
FacturaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model('Factura', FacturaSchema);
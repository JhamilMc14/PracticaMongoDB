const { Schema, model } = require('mongoose');

const CiudadSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    distrito: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },

}, { collection: 'ciudades' });
CiudadSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Ciudad', CiudadSchema);
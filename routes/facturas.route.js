/*
path: /api/facturas 
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getFacturas,
    crearFactura,
    eliminarFactura,
    actualizarFactura
} = require('../controllers/facturas.controller');


const router = Router();

router.get('/', validarJWT, getFacturas);

router.post('/', [
        validarJWT,
        check('numero', 'El numero de la factura es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearFactura);
router.put('/:id', [
        validarJWT,
        check('numero', 'El numero de la factura es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarFactura);
router.delete('/:id', validarJWT, eliminarFactura);

module.exports = router;
/*
    Path: /api/proveedor
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,

} = require('../controllers/proveedor.controller');

const router = Router();

router.get('/', validarJWT, getProveedor);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearProveedor
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarProveedor
);
router.delete('/:id', validarJWT, eliminarProveedor);

module.exports = router;
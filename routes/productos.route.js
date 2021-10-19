/*

    Path: /api/productos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,

} = require('../controllers/productos.controller');



const router = Router();

router.get('/', getProductos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('precio', 'El precio del producto es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearProducto);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('precio', 'El precio del producto es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarProducto);

router.delete('/:id', validarJWT, eliminarProducto);

module.exports = router;
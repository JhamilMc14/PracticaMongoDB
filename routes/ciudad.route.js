/*
    ciudad
    ruta: '/api/ciudad'
*/

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCiudad,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad,

} = require('../controllers/ciudad.controller');

const router = Router();

router.get('/', validarJWT, getCiudad)
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        check('distrito', 'El distrito es obligatorio').not().isEmpty(),
        check('pais', 'El país es necesario').not().isEmpty(),
        validarCampos
    ],
    crearCiudad
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        check('distrito', 'El email es obligatorio').not().isEmpty(),
        check('pais', 'El país es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarCiudad
);
router.delete('/:id',
    eliminarCiudad
);
module.exports = router;
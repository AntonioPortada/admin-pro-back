const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuario, setUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

const router = Router();

router.get( '/', validarJWT, getUsuario );

router.post('/', [
    //middleward para las validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password' , 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], setUsuario );

router.put( '/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('rol', 'Debes estar logueado para realizar la función').not().isEmpty()
], updateUsuario );

router.delete( '/:id', deleteUsuario );

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El correo es necesario').isEmail(),
    check('password', 'El password es necesario').not().isEmpty(),
    validarCampos
], login);

module.exports = router;
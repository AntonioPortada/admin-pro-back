const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res ) => {


    const { email, password } = req.body;

    try {

        const usuarioDb = await Usuario.findOne({ email });

        if(!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: 'correo no encontrado'
            });
        }

        const validarPass = bcrypt.compareSync( password, usuarioDb.password );

        const token = await generarJWT(usuarioDb.id);

        if(!validarPass) {
            return res.status(404).json({
                ok: false,
                msg: 'contraseña incorrecta'
            });
        }

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta al administrador'
        });
    }
}

module.exports = {
    login
}
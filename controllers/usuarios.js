const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const getUsuario = async(req, res) => {

    const usuarios = await Usuario.find();
    
    res.json({
        ok: true,
        usuarios
    });
}

const setUsuario = async(req, res) => {

    const { email,  password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se ha registrado'
            });
        }

        const usuario = new Usuario( req.body );
    
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch ( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error catch crear: '+error
        });
    }

}

const updateUsuario = async(req, res) => {

    const uid = req.params.id;

    try {
        const usuariodb = await Usuario.findById( uid );

        if(!usuariodb) {
            return res.status(404).json({
                ok:false,
                msg: 'NO existe usario'
            });
        }

        res.json({
            ok: true
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        });
    }
}

const deleteUsuario = async(req, res) => {

    const uid = req.params.id;

    await Usuario.findByIdAndDelete( uid );

    res.json({
        ok: true,
        msg: "borrar correcto",
        uid
    });
}

module.exports = {
    getUsuario,
    setUsuario,
    updateUsuario,
    deleteUsuario
}
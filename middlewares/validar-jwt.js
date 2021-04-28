const jwt = require('jsonwebtoken');

const validarJWT = ( req, resp, next ) => {

    const token = req.header('x-token');

    if(!token) { 
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        
    } 
    catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}
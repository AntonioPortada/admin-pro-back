const express = require('express');

require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./db/config');

const app = express();

app.use( cors() );

app.use( express.json() );

dbConnection();

//console.log( process.env );

//se llama al archivo usuarios de routes para obtener las rutas de ese módulo o paquete o api
app.use( '/api/usuarios', require('./routes/usuarios') );

//login
app.use( '/api/login', require('./routes/auth') );

app.listen( 3000, () => {
    console.log('Hola Mundo Corriendo en puerto 3000');
});

//user:mean_user
//pass:qCknWvUQ82dTm0QI

app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'hola Mundo'
    });

});
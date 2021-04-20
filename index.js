const express = require('express');

require('dotenv').config();

const {dbConnection} = require('./db/config');

const app = express();

dbConnection();

//console.log( process.env );

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
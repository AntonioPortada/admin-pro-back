const mongoose = require('mongoose');

const dbConnection = async() => {

    const url = process.env.DB_CNN;

    try {
    mongoose.connect(url, 
             {
                 useNewUrlParser: true, 
                 useUnifiedTopology: true,
                 userCreateIndex: true
            }
        );

        console.log('DB online');

    }
    catch(error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la BD');
    }

}

module.exports = {
    dbConnection
}
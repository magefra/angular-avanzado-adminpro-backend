const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() =>{
 
 try {
     
    await  mongoose.connect(process.env.BD_CNN, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log('Conexión exitosa');
 } catch (error) {
     console.log(error);
     throw new Error('Error a la hora de iniciar la BD ver logs');
 }
 
 
}

module.exports= {
    dbConnection
}
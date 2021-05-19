//Notas: 
// Nodemon --> npm install -g nodemon
// Express --> npm install express --save | nodemon index.js
// Mongoose --> npm install mongoose --save
// ENV -->  npm i dotenv
// CORS --> npm i cors
const express = require('express');
const {dbConnection} = require('./database/confi');
require('dotenv').config();

//Crear el servidor express
const app = express();


//db Conexión
dbConnection();



// CORS
app.use(cors());


app.get('/', (req, res) =>{
    res.status(200).json({
        ok: true,
        msg: 'Perfecto'
    })
});


app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto' + process.env.PORT);
});
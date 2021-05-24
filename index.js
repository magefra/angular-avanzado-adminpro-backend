//Notas: 
// Nodemon --> npm install -g nodemon
// Express --> npm install express --save | nodemon index.js
// Mongoose --> npm install mongoose --save
// ENV -->  npm i dotenv
// CORS --> npm i cors
// Validaciones --> npm i express-validator
// Jsonwebtoken --> npm i jsonwebtoken
const express = require('express');
const {dbConnection} = require('./database/confi');
require('dotenv').config();
const cors = require('cors');

//Crear el servidor express
const app = express();


//db Conexión
dbConnection();



// CORS
app.use(cors());


//Lectura y parseo del body
app.use(express.json());


//Ruta usuarios
app.use('/api/usuarios', require('./routes/usuarios'));

//Ruta login
app.use('/api/login', require('./routes/auth'));

//Ruta hospitales
app.use('/api/hospitales', require('./routes/hospitales'));

app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto' + process.env.PORT);
});
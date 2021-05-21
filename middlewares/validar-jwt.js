const {response, request} =  require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    //Leer el token
    const token = req.header('x-token');


    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });

    }

    try {
        
        const {uuid} = jwt.verify(token, process.env.SECRET_JWT_SEED);


        req.uuid = uuid;
        next();

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Token no válido'
        })
    }


   


}


module.exports = {
    validarJWT
}
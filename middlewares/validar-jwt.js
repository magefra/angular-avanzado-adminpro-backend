const {response, request} =  require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios')

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



const validarADMIN_ROLE =async(req, res = response, next) =>{
    
    const uuid =req.uuid;
    try {
        
        const usuarioDB =await Usuario.findById(uuid);

        if(!usuarioDB){
            return res.status(404).json({
                    ok: false,
                    msg: 'Usuario no éxiste'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
        });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarADMIN_ROLE_o_MismoUsuario =async(req, res = response, next) =>{
    
    const uuid =req.uuid;
    const id = req.params.id;

    try {
        
        const usuarioDB =await Usuario.findById(uuid);

        if(!usuarioDB){
            return res.status(404).json({
                    ok: false,
                    msg: 'Usuario no éxiste'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE' && uuid !== id){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
        });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}
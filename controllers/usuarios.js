const Usuario =require('../models/usuarios');
const {generarJWT} = require('../helpers/jwt');


const {response} = require('express');

const bcrypt = require('bcryptjs');



const getUsuarios = async(req, res) =>{


    const usuarios  = await Usuario.find({},"nombre email rol google");

    res.json({
        ok: true,
         msg: 'get usuarios',
         usuarios,
         uuid: req.uuid
    });
}

const crearUsuario = async (req, res = response ) =>{

   const {email, password} = req.body;


   try {


    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
        });
    }


    const usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt =bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    

  //Generar el token
  const token  =await generarJWT(usuario.id);


    await usuario.save();


    res.json({
        ok: true,
        msg: 'Creando Usuario',
        token,
        usuario
    });


   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Error inesperado... revisar logs'
       });
   }

}



const actualizarUsuario = async (req, res = response ) =>{


 // TODO: Validar token y comprobar si es el usuario correcto

 const uid = req.params.id;


 try {

     const usuarioDB = await Usuario.findById( uid );

     if ( !usuarioDB ) {
         return res.status(404).json({
             ok: false,
             msg: 'No existe un usuario por ese id'
         });
     }

     // Actualizaciones
     const { password, google, email, ...campos } = req.body;

     if ( usuarioDB.email !== email ) {

         const existeEmail = await Usuario.findOne({ email });
         if ( existeEmail ) {
             return res.status(400).json({
                 ok: false,
                 msg: 'Ya existe un usuario con ese email'
             });
         }
     }
     
     campos.email = email;
     const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

     res.json({
         ok: true,
         usuario: usuarioActualizado
     });

     
 } catch (error) {
     console.log(error);
     res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
     })
 }
 
 }



 const eliminarUsuario = async(req, res = response) =>{


    const uuid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uuid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }


        await Usuario.findByIdAndDelete( uuid );


        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
   


    } catch (error) {
        console.log(error);
     res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
     })
    }
 }


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
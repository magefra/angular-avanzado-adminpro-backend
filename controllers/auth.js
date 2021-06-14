const { response, request } = require("express");
const bcrypt = require('bcryptjs');


const {googleVerify} = require('../helpers/google-verify');

const Usuario = require("../models/usuarios");
const {generarJWT} = require('../helpers/jwt');
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {


    // Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "email invalido",
      });
    }


    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña no valida'
        });
    }

    //Generar el token
    const token  =await generarJWT(usuarioDB.id);


    res.status(200).json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};


const googleSignIn = async(req, resp = response) =>{
  
  const googleToken = req.body.token;

  console.log(googleToken);

  try {
   const {name,email,picture} =  await googleVerify(googleToken);
  
   const usuarioDB = await Usuario.findOne({email});
   let usuario;

   if(!usuarioDB){
      // Si no existe el usuario
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      });
   }else{
     // existe usuario
     usuario = usuarioDB;
     usuario.google = true;
   }

   await usuario.save();

 //Generar el token
 const token  =await generarJWT(usuario.id);


 

  resp.json({
    ok: true,
    msg: 'Google SignIn',
    token,
    menu: getMenuFrontEnd(usuario.role)
  });

  } catch (error) {
    resp.status(401).json({
      ok: false,
      msg: 'Token no es correcto'
    });
  }

  
}


const renewToken = async(req, resp = response)  =>{

  const uuid = req.uuid;
 
  //Generar el token
 const token  =await generarJWT(uuid);

  //Obtener el usuario por uuid
  const usuarioDB = await Usuario.findById(uuid);


  resp.json({
   ok:true,
   token,
   usuarioDB,
   menu: getMenuFrontEnd(usuarioDB.role)
 });
}

module.exports = {
  login,
  googleSignIn,
  renewToken
};

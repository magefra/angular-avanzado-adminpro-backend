/*
    Ruta: /api/usuarios
*/

const {Router} = require('express');
const {getUsuarios, crearUsuario,actualizarUsuario, eliminarUsuario} = require('../controllers/usuarios');

const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();



//Rutas
router.get('/',validarJWT, getUsuarios);


router.post('/',[

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);



router.put('/:id',
[
    validarJWT,
    validarADMIN_ROLE_o_MismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('email','El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(), 
    validarCampos,
    
], actualizarUsuario);


router.delete('/:id',[validarJWT, validarADMIN_ROLE], eliminarUsuario);

module.exports = router;
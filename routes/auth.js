/*
    Ruta: /api/login
*/

const {Router} = require('express');
const {login,googleSignIn} = require('../controllers/auth');


const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().notEmpty(),
    validarCampos
], login);


router.post('/google',[
    check('token', 'El Token de google es obligatorio').not().notEmpty(),
    validarCampos
], googleSignIn);



module.exports = router;

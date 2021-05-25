/*
    Ruta: /api/busuqueda
*/

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const {  getBusqueda } = require('../controllers/busqueda');



const router = Router();



//Rutas
router.get('/:busqueda', 
     validarJWT,
     getBusqueda
);



module.exports = router;
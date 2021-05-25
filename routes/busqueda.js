/*
    Ruta: /api/busuqueda
*/

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const {  getBusqueda, getDocumentosColeccion } = require('../controllers/busqueda');



const router = Router();



//Rutas
router.get('/:busqueda', 
     validarJWT,
     getBusqueda
);

router.get('/coleccion/:tabla/:busqueda', 
     validarJWT,
     getDocumentosColeccion
);


module.exports = router;
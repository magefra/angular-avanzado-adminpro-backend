const { response } = require("express")

const Usuario = require('../models/usuarios');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getBusqueda = async(req, res = response) =>
{

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");


    const [usuario, medico, hospital] = await Promise.all([
         Usuario.find({nombre: regex}),
         Medico.find({nombre: regex}),
         Hospital.find({nombre: regex})

    ]);


    console.log(busqueda);

        res.status(200).json({
            ok: true,
            usuarios: usuario,
            medicos: medico,
            hospitales: hospital
        });       
}


const getDocumentosColeccion = async(req, res = response) =>
{

    const tabla  = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");


    let data = [];

    switch(tabla){
        case 'medicos':
            data= await  Medico.find({nombre: regex})
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img')
       
            break;
        case 'hospitales':
            data= await Hospital.find({nombre: regex})
                                .populate('usuario', 'nombre img');
           
            break;
        case 'usuarios':
            data =  await Usuario.find({nombre: regex});
           
            break;

            default:
             return   res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser  usuarios/hospitales/medicos'
                });



    }



    res.json({
        ok: true,
        resulados: data
    });      
}

module.exports = {
    getBusqueda,
    getDocumentosColeccion
}
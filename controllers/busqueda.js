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



module.exports = {
    getBusqueda
}
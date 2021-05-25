const { response } = require("express")


const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) =>
{

        const hospitales = await Hospital.find()
                                          .populate('usuario', 'nombre img');

        res.status(200).json({
            ok: true,
            hospitales
        });       
}


const crearHospital = async(req, res = response) =>
{
        const uuid = req.uuid;

        const hospital = new Hospital({
            usuario: uuid,
            ...req.body
        });
  

        try {
            

           const hospitalDB =  await hospital.save();

            res.status(200).json({
                ok: true,
                hospital: hospitalDB
            });    


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador'
            })
        }
   
}

const actualizarHospital = (req, res = response) =>
{
        res.status(200).json({
            ok: true,
            msg: 'actualizarHospital'
        });       
}



const borrarHospital = (req, res = response) =>
{
        res.status(200).json({
            ok: true,
            msg: 'borrarHospital'
        });       
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
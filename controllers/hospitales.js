const { response } = require("express")


const getHospitales = (req, res = response) =>
{
        res.status(200).json({
            ok: true,
            msg: 'getHospitales'
        });       
}


const crearHospital = (req, res = response) =>
{
        res.status(200).json({
            ok: true,
            msg: 'crearHospital'
        });       
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
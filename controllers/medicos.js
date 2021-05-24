const { response } = require("express")

const Medico = require('../models/medico')

const getMedicos = (req, res = response) =>
{
        res.status(200).json({
            ok: true,
            msg: 'getMedicos'
        });       
}


const crearMedico = async(req, res = response) =>
{

    const uuid = req.uuid;

    const medico = new Medico({
        usuario: uuid,
        ...req.body
    });

    try {
        

        const medicoDB =  await medico.save();

        res.status(200).json({
            ok: true,
            medicoDB
        });   




    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

           
}

const actualizarMedico = (req, res = response) =>
{


    try {


        res.status(200).json({
            ok: true,
            msg: 'actualizarMedico'
        }); 

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

             
}



const borrarMedico = (req, res = response) =>
{
        res.status(200).json({
            ok: true,
            msg: 'borrarMedico'
        });       
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
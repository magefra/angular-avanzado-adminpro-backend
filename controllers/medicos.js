const { response } = require("express")

const Medico = require('../models/medico')

const getMedicos = async(req, res = response) =>
{

    const medicos = await Medico.find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');


        res.status(200).json({
            ok: true,
            medicos
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

const actualizarMedico = async(req, res = response) =>
{

    const medicoId = req.params.id;
    const uuid = req.uuid;

    try {

        const medicoDB = await Medico.findById(medicoId);
        if(!medicoDB){
          return  res.status(404).json({
              ok: false,
              msg: 'Medico no encotrado por id'
            });
        }



        const cambioMedico = {
            ... req.body,
            usuario : uuid
        }
  
        const MedicoActualizado  = await Medico.findByIdAndUpdate(medicoId, cambioMedico,{new:true});
            

        res.status(200).json({
            ok: true,
            medico: MedicoActualizado
        }); 

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

             
}



const borrarMedico = async (req, res = response) =>
{
    const medicoId = req.params.id;
    

    try {

        const medicoDB = await Medico.findById(medicoId);
        if(!medicoDB){
          return  res.status(404).json({
              ok: false,
              msg: 'Medico no encotrado por id'
            });
        }



        await Medico.findByIdAndDelete(medicoId);
  
        
        res.status(200).json({
            ok: true,
            msg: 'Medicoo eliminado'
        }); 

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }      
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
const { response } = require("express")


const Hospital = require('../models/hospital2');

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

const actualizarHospital = async(req, res = response) =>
{

     const hospitalId = req.params.id;
     const uuid = req.uuid;

      try {

      const hospitalDB = await Hospital.findById(hospitalId);
       if(!hospitalDB){
         return  res.status(404).json({
             ok: false,
             msg: 'Hospital no encotrado por id'
           });
       }

      const cambioHospital = {
          ... req.body,
          usuario : uuid
      }

      const hospitalActualizado  = await Hospital.findByIdAndUpdate(hospitalId, cambioHospital,{new:true});
          
        res.status(200).json({
            ok: true,
            msg: 'actualizarHospital',
            hospitalActualizado
        }); 
      } catch (error) {
          console.log(error);
          res.status(500).json({
               ok:false,
               msg: 'Hable con el administrador'
          });
      }

      
}



const borrarHospital = async(req, res = response) =>
{

    const hospitalId = req.params.id;
 

      try {

      const hospitalDB = await Hospital.findById(hospitalId);
       if(!hospitalDB){
         return  res.status(404).json({
             ok: false,
             msg: 'Hospital no encotrado por id'
           });
       }

       await Hospital.findByIdAndDelete(hospitalId);
       
    
        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
        }); 

        
      } catch (error) {
          console.log(error);
          res.status(500).json({
               ok:false,
               msg: 'Hable con el administrador'
          });
      }
  
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
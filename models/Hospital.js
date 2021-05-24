const {Schema, model} = require('mongoose');


const HospitalesSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    img:{
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Hospitales'});


HospitalesSchema.method('toJSON',function(){
   const {__v, ...object}  = this.toObject();
   return object;
});



module.exports = model('Usuario', HospitalesSchema);
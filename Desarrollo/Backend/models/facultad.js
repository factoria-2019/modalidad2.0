

var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var facultadSchema = new Schema({  //Esquema con validaciones.

    nombre:{ type:String, required:[true, 'El nombre de la facultad es necesario']},
    telefono:{ type:String, required:[true, 'El telefono de la facultad  es necesario']},
    email:{ type:String,unique:true, required:[true, 'El correo de la facultad es necesario']}
});

// nombre telefono email
module.exports = mongoose.model('facultad',facultadSchema);
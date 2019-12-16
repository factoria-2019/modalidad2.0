var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var certificado = new Schema({  
    Cumplimento:{ type:String, required:[true, 'El certificado de cumplimiento es necesario']},
    Id_Estudiante:{ type:Object, required:[true, 'El id del estudiante  es necesario']},
    Id_Sustentacion:{ type:Object, required:[true, 'el id de la sustentacion es necesario']},
    Fecha:{type:Date, "default" : Date.now}
});


certificado.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('certificado', certificado);
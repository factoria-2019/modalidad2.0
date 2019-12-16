var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var sustentacion = new Schema({  
    fecha_solicitud:{type:Date, required:[true, 'la fecha de sustentacion es necesario']},
    lugar:{ type:String, required:[true, 'el lugar es necesario']},
    jurados:{ type:String, required:[true, 'los jurados son necesario']},
    estudiante:{ type:String, required:[true, 'estudiante necesario']},
    estado:{type:String,"default":"enviada"},
    fecha_solicitud:{type:Date, "default" : Date.now}
});


sustentacion.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('sustentacion', sustentacion);
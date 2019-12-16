var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var sustentacion = new Schema({  
    Fecha:{type:Date, required:[true, 'la fecha de sustentacion es necesario']},
    Lugar:{ type:String, required:[true, 'el lugar es necesario']},
    Jurados:{ type:String, required:[true, 'los jurados son necesario']},
    Id_Estudiante:{ type:Object, required:[true, 'estudiante necesario']},
    Estado:{type:String,"default":"enviada"},
    Fecha_Publicada:{type:Date, "default" : Date.now}
});


sustentacion.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('sustentacion', sustentacion);

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var semillero = new Schema({  
    nombre:{ type:String, required:[true, 'El nombre del semillero es necesario']},
    director:{ type:String, required:[true, 'El director del semillero es necesario']},
    tematica:{ type:String, required:[true, 'la tematica es necesario']},
    descripcion:{ type:String, required:[true, 'la descripcion del semillero es necesario']},
    grupo_inv:{ type:String, required:[true, 'grupo de investigacion al que pertenece es necesario']},
    estado:{type:String,"default":"activo"},
    fecha_solicitud:{type:Date, "default" : Date.now}
});


semillero.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('semillero', semillero);

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var grupo_investigacion = new Schema({  
    nombre:{ type:String, required:[true, 'El nombre del grupo de investigacion es necesario']},
    director:{ type:String, required:[true, 'El director del semillero es necesario']},
    tematica:{ type:String, required:[true, 'la tematica es necesario']},
    descripcion:{ type:String, required:[true, 'la descripcion del grupo de investigacion es necesario']},
    estado:{type:String,"default":"activo"},
    fecha_solicitud:{type:Date, "default" : Date.now}
});


grupo_investigacion.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('grupo_investigacion', grupo_investigacion);

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var grupo_investigacion = new Schema({  
    Nombre_Grupo:{ type:String, required:[true, 'El nombre del grupo de investigacion es necesario']},
    Director_Grupo:{ type:String, required:[true, 'El director del semillero es necesario']},
    Tema_Grupo:{ type:String, required:[true, 'la tematica es necesario']},
    Descripcion_Grupo:{ type:String, required:[true, 'la descripcion del grupo de investigacion es necesario']},
    Estado:{type:String,"default":"activo"},
    Fecha:{type:Date, "default" : Date.now}
});


grupo_investigacion.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('grupo_investigacion', grupo_investigacion);
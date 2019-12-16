
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var semillero = new Schema({  
    Nombre_Semi:{ type:String, required:[true, 'El nombre del semillero es necesario']},
    Director_Semi:{ type:String, required:[true, 'El director del semillero es necesario']},
    Tema_Semi:{ type:String, required:[true, 'la tematica es necesario']},
    Descripcion_Semi:{ type:String, required:[true, 'la descripcion del semillero es necesario']},
    Id_Grupo:{ type:Object, required:[true, 'grupo de investigacion al que pertenece es necesario']},
    Estado_Semi:{type:String,"default":"activo"},
    Fecha:{type:Date, "default" : Date.now}
});


semillero.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('semillero', semillero);
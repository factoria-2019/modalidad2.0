
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;

function rand_code(chars, lon){
    code = "SEMI_";
    for (x=0; x < lon; x++)
    {
        rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }
    return code;
}
    
caracteres = "0123456789abcdefABCDEF";
longitud = 10;
var radicar = rand_code(caracteres, longitud);

var semillero = new Schema({ 
    
    Id_Estudiante:{type:Object, required:[true, 'El id del estudiante es necesario']},
    Id_Grupo:{ type:Object, required:[true, 'El id del grupo de investigacion es necesario']},
    Id_Semi:{ type:Object, required:[true, 'El id del semillero es necesario']},
    Actividad_Semi:{ type:String, required:[true, 'las actividades del semillero es necesario']},
    Proyecto_Semi:{ type:String, required:[true, 'la tematica del proyecto es necesario']},
    Objetivo_Semi:{ type:String, required:[true, 'El objetivos general del proyecto es necesario']},
    Objetivo_Especifico_Semi:{ type:String, required:[true, 'El objetivos especificos es necesario']},
    Justificacion_Semi:{ type:String, required:[true, 'la justificacion es necesario']},
    Fecha:{type:Date, "default" : Date.now},
    Radicado:{type:String,"default":radicar}, 
    Estado_Semi:{type:String,"default":"enviada"}
});


semillero.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('solicitud_semillero', semillero);

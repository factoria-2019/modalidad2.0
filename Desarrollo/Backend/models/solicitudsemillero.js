
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;



var semillero = new Schema({ 
    readicacion:{type:String,required:[true, 'la radicacion es necesario']}, 
    grupoinvestigacion:{ type:String, required:[true, 'El grupo de investigacion es necesario']},
    nombressemillero:{ type:String, required:[true, 'El nombre del semillero es necesario']},
    programaUniversitario:{ type:String, required:[true, 'El programa es necesario']},
    actividadessemillero:{ type:String, required:[true, 'El actividades del semillero es necesario']},
    tutorsemillero:{ type:String, required:[true, 'El tutor es necesario']},
    tematicaproyecto:{ type:String, required:[true, 'la tematica del proyecto es necesario']},
    objetivosgeneral:{ type:String, required:[true, 'El objetivos general del proyecto es necesario']},
    objetivosespecificos:{ type:String, required:[true, 'El objetivos especificos es necesario']},
    justificacion:{ type:String, required:[true, 'El nombre es necesario']},
    fecha_solicitud:{type:Date, "default" : Date.now},
    estado:{type:String,"default":"enviada"}
});


semillero.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});
module.exports = mongoose.model('solicitud_semillero', semillero);

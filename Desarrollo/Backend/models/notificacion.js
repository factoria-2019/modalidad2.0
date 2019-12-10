var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var tipoNotificacion = {
    values: ['Has sido aceptado', 'Has sido rechazado',' Solicita aprobación'],
    message: '{VALUE} NO ES UN TIPO DE NOTIFICACION VALIDA'
};
var notificacionChema = new Schema({ //Esquema con validaciones.

    emisor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id emisor es un campo obligatorio'] },
    receptor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id receptor es un campo obligatorio'] },
    tipoNotificacionEmisor: {  type:String, required:true,default:'Has sido aceptado', enum: tipoNotificacion},
    tipoNotificacionReceptor: {  type:String, required:true,default:'Has sido aceptado', enum: tipoNotificacion},
});

// emisor receptor tipoNotificacion
module.exports = mongoose.model('notificacion', notificacionChema);


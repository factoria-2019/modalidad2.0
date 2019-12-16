var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var tipoNotificacion = {
    values: ['Envió una solicitud a','Aceptó la solicitud', 'Rechazó la solicitud','Solicita la aprobación de'],
    message: '{VALUE} NO ES UN TIPO DE NOTIFICACION VALIDA'
};
var notificacionChema = new Schema({ //Esquema con validaciones.

    emisor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id emisor es un campo obligatorio'] },
    receptor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id receptor es un campo obligatorio'] },
    tipoNotificacionEmisor: {  type:String, required:true,default:'Envió una solicitud a', enum: tipoNotificacion},
    tipoNotificacionReceptor: {  type:String, required:true,default:'Solicita la aprobación de', enum: tipoNotificacion},
});

// emisor receptor tipoNotificacion
module.exports = mongoose.model('notificacion', notificacionChema);


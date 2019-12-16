
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema = mongoose.Schema;

var requisitos = new Schema({  
    ficha_academica:{ type:String, required:[true, 'El grupo de investigacion es necesario']},
    semillero_activo:{ type:String, required:[true, 'El nombre del semillero es necesario']},
    proyecto_financiado:{ type:String, required:[true, 'El programa es necesario']},
    articulo_cientifico:{ type:String, required:[true, 'El actividades del semillero es necesario']},
    ponencia:{ type:String, required:[true, 'El tutor es necesario']},
    estado:{type:String,"default":"enviada"},
    fecha_solicitud:{type:Date, "default" : Date.now}

});


requisitos.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});

module.exports = mongoose.model('requisitos', requisitos);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var anteProyectoChema = new Schema({ //Esquema con validaciones.

    rutaAnteproyecto: { type: String, unique: true, required: [true, 'La ruta del anteproyecto es necesario'] },
    estado: { type: Boolean, default: false },

});

anteProyectoChema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

// ruta estado
module.exports = mongoose.model('anteproyecto', anteProyectoChema);
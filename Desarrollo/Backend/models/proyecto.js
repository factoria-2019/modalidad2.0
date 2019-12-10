var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var proyectoChema = new Schema({ //Esquema con validaciones.

    tema: { type: String, required: [true, 'El tema del proyecto es necesario'] },
    palabraClave1: { type: String, required: [true, 'La palabra clave #1 es necesaria'] },
    palabraClave2: { type: String, required: [true, 'La palabra clave #2 es necesaria'] },
    palabraClave3: { type: String, required: [true, 'La palabra clave #3 es necesaria'] },
    rutaProyecto: { type: String, unique: true, required: [true, 'La ruta del proyecto es necesaria'] },
    estado: { type: Boolean, default: false },

});

proyectoChema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

// ruta estado
module.exports = mongoose.model('proyecto', proyectoChema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var articuloChema = new Schema({ //Esquema con validaciones.

    rutaArticulo: { type: String, unique: true, required: [true, 'La ruta del artículo es necesaria'] },
    estado: { type: Boolean, default: false },

});


// ruta estado
module.exports = mongoose.model('articulo', articuloChema);
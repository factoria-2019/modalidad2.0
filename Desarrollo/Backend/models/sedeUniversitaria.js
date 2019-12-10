

var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var sedeChema = new Schema({  //Esquema con validaciones.

    nombre:{ type:String, required:[true, 'El nombre de la sede es necesario']},
    ciudad:{ type:String, required:[true, 'La ciudad de la sede es necesaria']},
    direccion:{ type:String, required:[true, 'La direccion de la sede es necesaria']},
    email:{ type:String,unique:true, required:[true, 'El correo de la sede es necesario']}
});

// nombre ciudad direccion email
module.exports = mongoose.model('sede',sedeChema);
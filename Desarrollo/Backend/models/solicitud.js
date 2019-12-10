var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoModalidadValido = {
    values: ['PROYECTO DE GRADO'],
    message: '{VALUE} NO ES UN TIPO DE MODADLIDAD VALIDO'
};



var solicitudSchema = new Schema({ //Esquema con validaciones.

    tipoModalidad: { type: String, default: 'PROYECTO DE GRADO', enum: tipoModalidadValido, required: [true, 'El tipo modalidad es necesario'] },
    tituloProyecto: { type: String, required: [true, 'El titulo del proyecto es necesario'] },
    estudiante1: { type: String, required: [false, 'El id estudiante es un campo obligatorio'] },
    estudiante2: { type: String, required: false },
    estudiante3: { type: String, required: false },
    consejero1: { type: String, required: [false, 'El id consejero es un campo obligatorio'] },
    consejero2: { type: String, required: false },
    consejero3: {type: String, required: false },
    jefePrograma: { type: String, required: [false, 'El id jefePrograma es un campo obligatorio'] },
    anteproyecto: { type: Schema.Types.ObjectId, ref: 'anteproyecto', required: false },
    proyecto: { type: Schema.Types.ObjectId, ref: 'proyecto', required: false },
    articulo: { type: Schema.Types.ObjectId, ref: 'articulo', required: false }

});

// nombre telefono email
module.exports = mongoose.model('solicitud', solicitudSchema);
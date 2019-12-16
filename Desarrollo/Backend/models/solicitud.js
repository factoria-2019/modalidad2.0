var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var tipoModalidadValido = {
    values: ['PROYECTO DE GRADO'],
    message: '{VALUE} NO ES UN TIPO DE MODADLIDAD VALIDO'
};*/



var solicitudSchema = new Schema({ //Esquema con validaciones.

   // tipoModalidad: { type: String, default: 'PROYECTO DE GRADO', enum: tipoModalidadValido, required: [true, 'El tipo modalidad es necesario'] },
  
   solicitanteId: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
   fechaSolicitud: { type: String, required: [true, 'La fecha de solicitud es necesaria'] },
    tituloProyecto: { type: String, required: [true, 'El titulo del proyecto es necesario'] },
    lineaInvestigacion: { type: String, required: [true, 'La linea de  investigación del proyecto es necesaria'] },
    estudiante1: { type: String, required: [false, 'El id estudiante es un campo obligatorio'] },
    estudiante2: { type: String, required: false },
    estudiante3: { type: String, required: false },
    pais: { type: String, required: [true, 'El pais donde se aplicará el proyecto es necesario'] },
    departamento: { type: String, required: [true, 'El departamento donde se aplicará el proyecto es necesario'] },
    ciudad: { type: String, required: [true, 'La ciudad donde se aplicará el proyecto es necesario'] },
    duracionProyectoMeses: { type: String, required: [true, 'La duración del proyecto en meses es necesaria'] },
    jefePrograma: { type: String, required: [false, 'El id jefePrograma es un campo obligatorio'] },
    palabrasClaves: { type: String, required: [true, 'las palabras claves es un campo obligatorio'] },
    resumenProyecto: { type: String, required: [true, 'El resumen del proyecto es un campo obligatorio'] },
    anteproyecto: { type: Schema.Types.ObjectId, ref: 'anteproyecto', required: false },
    proyecto: { type: Schema.Types.ObjectId, ref: 'proyecto', required: false },
    articulo: { type: Schema.Types.ObjectId, ref: 'articulo', required: false }

});

// nombre telefono email
module.exports = mongoose.model('solicitud', solicitudSchema);
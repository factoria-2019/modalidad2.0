

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');   


var Schema= mongoose.Schema;


var roleValidos={

    values:['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} NO ES UN ROL PERMITIDO'

};


// Array de los distintos tipos de usuario.
var tipoUsuarioValido={

    values:['Estudiante','Docente','Jefe de programa'],
    message: '{VALUE} NO ES UN TIPO DE USUARIO PERMITIDO'

};

// Array de los distintos tipos de ID.
var tipoIDValido={

    values:['C.C','T.I'],
    message: '{VALUE} NO ES UN TIPO DE ID PERMITIDO'

};

var sedesUniversitariasValidas={

    values:['Gárzon','La plata','Neiva','Pitalito'],
    message: '{VALUE} NO ES UNA SEDE PERMITIDO'

};
var facultadesValidas={

    values:['Ingeniería'],
    message: '{VALUE} NO ES UNA FACULTAD PERMITIDO'

};

var programaUniversitarioValidos={

    values:['Ingeniería de software'],
    message: '{VALUE} NO ES UN PROGRAMA PERMITIDO'

};


var generoValidos={

    values:['Masculino','Femenino'],
    message: '{VALUE} NO ES UN GÉNERO PERMITIDO'
};

var usuarioSchema = new Schema({  //Esquema con validaciones.

    nombres:{ type:String, required:[true, 'El nombre es necesario']},
    apellidos:{ type:String, required:[true, 'El apellido es necesario']},
    password:{ type:String, required:[true, 'La contraseña es necesaria']},
    email:{ type:String,unique:true, required:[true, 'El correo es necesario']},
    telefono:{ type:String, required:[true, 'El telefono es necesario']},
    tipoUsuario:{ type:String, required:true,default:'Estudiante', enum: tipoUsuarioValido},
    tipoID:{ type:String, required:true,default:'C.C', enum: tipoIDValido},
    numDocumento:{ type:String,unique:true, required:[true, 'El numero de documento es necesario']},
    genero:{ type:String, required:true,default:'Masculino', enum: generoValidos},
    codigoUniversitario:{ type:String,unique:true, required:[true, 'El codigo universitario es necesario']},
    sedeUniversitaria:{ type:String, required:[true, 'La sede es necesaria'], enum: sedesUniversitariasValidas},
    facultad:{ type:String, required:[true, 'La facultad es necesaria'], enum: facultadesValidas},
    programaUniversitario:{ type:String, required:[true, 'El programa es necesario.'], enum: programaUniversitarioValidos},
    estado:{ type:Boolean ,default:true},
    role:{ type:String,default:'USER_ROLE', enum: roleValidos}
});

usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});


module.exports = mongoose.model('Usuario',usuarioSchema);
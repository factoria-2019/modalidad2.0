

var express = require('express');

var app= express();


var programa=require('../models/programaUniversitario');
var facultad=require('../models/facultad');
var sede=require('../models/sedeUniversitaria');
var Usuario=require('../models/usuario');


//===============================================
//  Busqueda por coleccion- metodo get
//===============================================


app.get('/coleccion/:tabla/:busqueda',(req,res,next)=>{

    var tabla = req.params.tabla;
    var busqueda= req.params.busqueda;
    var regex= new RegExp(busqueda,'i'); //Expresion regular.

    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa=  buscarUsuarios(busqueda, regex);
            break;
    
        default:
            res.status(400).json({
                ok:false,
                mensaje:'Los tipos de busqueda solo son: usuarios,medicos,hospitales',
                error:{ message: 'Tipo de tabla/coleccion no valido.'}
            });
            break;
    }

    promesa.then(data =>{

        res.status(200).json({
            ok:true,
            [tabla]:data  //Propiedad de objetos computadas.
        });

    });

    });


function buscarUsuarios(busqueda, regex){

    return new Promise((resolve,reject)=>{
        Usuario.find({},'nombres apellidos email telefono tipoUsuario tipoID numDocumento codigoUniversitario sedeUniversitaria facultad programaUniversitario role')
        .or([ {'nombres':regex}, {'email':regex}, {'numDocumento':regex}, {'sedeUniversitaria':regex}, {'role':regex}, {'tipoUsuario':regex}, {'codigoUniversitario':regex}])
        .exec((err,usuarios)=>{

            if(err){

                reject('Error al cargar los usuarios',err);
            }else{
                resolve(usuarios);
            }
        });


    });

    
}



module.exports= app;
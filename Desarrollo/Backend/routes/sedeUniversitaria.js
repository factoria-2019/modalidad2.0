
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app= express();

var sedeUniversitaria= require('../models/sedeUniversitaria');

//===============================================
//  Obteber todos las sedes
//===============================================




app.get('/',(req,res,next)=>{

    var desde=req.query.desde ||0;
    desde=Number(desde);
    sedeUniversitaria.find({},'nombre ciudad direccion email').skip(desde).limit(5).exec( 
        (err,sedes)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error cargando sedes!',
                errors:err
            });
        }


        sedeUniversitaria.count({},(err,conteo)=>{
            res.status(200).json({
                ok:true,
                sede: sedes,
                total:conteo
            });
        })
      
       


    });  //Metodo de mongoose.


  
    
    
    });


//===============================================
//  Actualizar sedes
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

sedeUniversitaria.findById(id,(err,sede)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar sedes!',
            errors:err
        });
    }

    if(!sede){
        return res.status(400).json({
            ok:false,
            mensaje: 'La sede con el '+id+' no existe.',
            errors:{message: 'No existe un sede con ese ID'}
        });
    }

//nombre ciudad direccion email
    sede.nombres = body.nombre;
    sede.ciudad= body.ciudad;
    sede.direccion= body.direccion;
    sede.email = body.email;

    sede.save((err,sedeGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar sedes!',
                errors:err
            });
        }

        res.status(200).json({
            ok:true,
            sede: sedeGuardado
        });


    });





});
  

});






//===============================================
//  Crear una nueva sede
//===============================================

app.post('/',(req,res)=>{


    var body = req.body;

    var sede= new sedeUniversitaria({ //referencia a una variable de tipo usuario

        nombre: body.nombre,
        ciudad: body.ciudad,
        direccion: body.direccion,
        email:body.email
    }); 

    sede.save((err,sedeGuardada)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear sedes!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            sede: sedeGuardada,
            usuariotoken: req.usuario
        });


    });
    
});




//===============================================
//  Eliminar usuarios por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id',(req,res)=>{

    var id = req.params.id; // id por el /:id.


    sedeUniversitaria.findByIdAndRemove(id,(err,sedeBorrada)=>{


        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al borrar sedes!',
                errors:err
            });
        }

        if(!sedeBorrada){
            return res.status(400).json({
                ok:false,
                mensaje: 'No existe una sede con este id: '+id+'.',
                errors:{message: 'No existe una sede con ese ID'}
            });
        }
        res.status(200).json({
            ok:true,
            sede: sedeBorrada
        });




    });


});



    module.exports= app;
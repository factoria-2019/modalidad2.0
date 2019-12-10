
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app= express();

var Facultad= require('../models/facultad');


//===============================================
//  Obteber todos las facultades
//===============================================



app.get('/',(req,res,next)=>{

    var desde=req.query.desde ||0;
    desde=Number(desde);

// CAMBIO!!! -*-*-*-*-*-*-*
Facultad.find({},'nombre telefono email').skip(desde).limit(5).exec( 
        (err,facultades)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error cargando facultades!',
                errors:err
            });
        }


        Facultad.count({},(err,conteo)=>{
            res.status(200).json({
                ok:true,
                facultad: facultades,
                total:conteo
            });
        })
      
       


    });  //Metodo de mongoose.


  
    
    
    });

//===============================================
//  Actualizar facultades
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

Facultad.findById(id,(err,facultad)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar facultad!',
            errors:err
        });
    }

    if(!facultad){
        return res.status(400).json({
            ok:false,
            mensaje: 'La facultad con el '+id+' no existe.',
            errors:{message: 'No existe una facultad con ese ID'}
        });
    }


    facultad.nombre = body.nombre;
    facultad.telefono= body.telefono;
    facultad.email = body.email;

    facultad.save((err,facultadGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar facultades!',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            facultad: facultadGuardado
        });


    });





});
  

});






//===============================================
//  Crear un nuevo usuario
//===============================================

app.post('/',(req,res)=>{


    var body = req.body;

    var facultadVariable= new Facultad({ 

        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email
    }); 

    facultadVariable.save((err,facultadGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear usuarios!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            facultadVariable: facultadGuardado,
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

    Facultad.findByIdAndRemove(id,(err,facultadBorrado)=>{


        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al borrar facultades!',
                errors:err
            });
        }

        if(!facultadBorrado){
            return res.status(400).json({
                ok:false,
                mensaje: 'No existe una facultad con este id: '+id+'.',
                errors:{message: 'No existe una facultad con ese ID'}
            });
        }
        res.status(200).json({
            ok:true,
            facultad: facultadBorrado
        });




    });


});



    module.exports= app;
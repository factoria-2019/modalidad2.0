

var express = require('express');

var app= express();
var Semillero = require('../models/semillero');

app.post('/',(req,res)=>{


    var body = req.body;

    var semillero = new Semillero({ //referencia a una variable de tipo usuario

        nombre: body.nombre,
        director: body.director,
        tematica: body.tematica,
        descripcion:body.descripcion,
        grupo_inv:body.grupo_inv
        
    }); 

    semillero.save((err,solicitudGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al enviar solicitud semillero!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            semillero: solicitudGuardado,
            usuariotoken: req.semillero
        });


    });
    
});


app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

Semillero.findById(id,(err,semillero)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar semillero!',
            errors:err
        });
    }

    if(!semillero){
        return res.status(400).json({
            ok:false,
            mensaje: 'El semillero con el '+id+' no existe.',
            errors:{message: 'No existe un semillero con ese ID'}
        });
    }


    semillero.nombres = body.nombres;
    semillero.director= body.director;
    semillero.tematica = body.tematica;
    semillero.descripcion=body.descripcion;
    semillero.grupo_inv=body.grupo_inv;
    semillero.estado=body.estado;

    semillero.save((err,semilleroGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar semilleor!',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            semillero: semilleroGuardado
        });


    });





});
  

});


app.get('/id/:_id', (req, res) => {
    var _id = req.params._id;
    Semillero.findOne({_id:_id})
    .populate('usuario', '_id')
        .exec((err, semillero) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar semillero por _id',
                    errors: err
                });
            }
            if (!semillero) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El semillero con el _id ' + id + ' no existe',
                    errors: { message: 'No existe un semillero con ese _id' }
                });
            }
            res.status(200).json({
            ok: true,
            semillero: semillero
            });
        })
    })
module.exports= app;


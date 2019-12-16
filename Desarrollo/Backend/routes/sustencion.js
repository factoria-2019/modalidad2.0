
var express = require('express');

var app= express();
var Sustentacion = require('../models/sustentacion');

app.post('/',(req,res)=>{


    var body = req.body;

    var sustentacion = new Sustentacion({ //referencia a una variable de tipo usuario

        Fecha: body.Fecha,
        Lugar: body.Lugar,
        Jurados: body.Jurados,
        Id_Estudiante:body.Id_Estudiante
        
    }); 

    sustentacion.save((err,solicitudGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al enviar sustentacion!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            sustentacion: solicitudGuardado,
            usuariotoken: req.sustentacion
        });


    });
    
});


app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

Sustentacion.findById(id,(err,sustentacion)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar sustentacion!',
            errors:err
        });
    }

    if(!sustentacion){
        return res.status(400).json({
            ok:false,
            mensaje: 'la sustentacion con el '+id+' no existe.',
            errors:{message: 'No existe una sustentacion con ese ID'}
        });
    }
    sustentacion.Fecha= body.Fecha;
    sustentacion.Lugar= body.Lugar;
    sustentacion.Jurados= body.Jurados;
    sustentacion.Id_Estudiante=body.Id_Estudiante;
    sustentacion.Estado=body.Estado;


    sustentacion.save((err,sustentacionGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar sustentacion!',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            sustentacion: sustentacionGuardado
        });


    });





});
  

});


app.get('/id/:_id', (req, res) => {
    var _id = req.params._id;
    Sustentacion.findOne({_id:_id})
    .populate('usuario', '_id')
        .exec((err, sustentacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar sustentacion por _id',
                    errors: err
                });
            }
            if (!sustentacion) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la sustentacion  con el _id ' + id + ' no existe',
                    errors: { message: 'No existe una sustentacion con ese _id' }
                });
            }
            res.status(200).json({
            ok: true,
            sustentacion: sustentacion
            });
        })
    })
module.exports= app;




var express = require('express');

var app= express();
var Semillero = require('../models/certificado');

app.post('/',(req,res)=>{


    var body = req.body;

    var semillero = new Semillero({ //referencia a una variable de tipo usuario

        Cumplimiento: body.Cumplimiento,
        Id_Sustentacion: body.Id_Sustentacion,
        Id_Estudiante:body.Id_Estudiante
        
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
            mensaje: 'Error al buscar certificado!',
            errors:err
        });
    }

    if(!semillero){
        return res.status(400).json({
            ok:false,
            mensaje: 'El certificado de cumplimiento con el '+id+' no existe.',
            errors:{message: 'No existe un certificado de cumplimiento con ese ID'}
        });
    }


    semillero.Cumplimiento = body.Cumplimiento;
    semillero.Id_Estudiante= body.Id_Estudiante;
    semillero.Id_Sustentacion = body.Id_Sustentacion;

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


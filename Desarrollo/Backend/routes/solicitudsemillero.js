

var express = require('express');

var app= express();
var Semillero = require('../models/solicitudsemillero');

app.post('/',(req,res)=>{


    var body = req.body;

    console.log(body)
    var semillero = new Semillero({ //referencia a una variable de tipo usuario

        Id_Estudiante: body.Id_Estudiante,
        Id_Grupo: body.Id_Grupo,
        Id_Semi: body.Id_Semi,
        Actividad_Semi:body.Actividad_Semi,
        Proyecto_Semi:body.Proyecto_Semi,
        Objetivo_Semi: body.Objetivo_Semi,
        Objetivo_Especifico_Semi:body.Objetivo_Especifico_Semi,
        Justificacion_Semi: body.Justificacion_Semi
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
            mensaje: 'Error al buscar solicitud semillero!',
            errors:err
        });
    }

    if(!semillero){
        return res.status(400).json({
            ok:false,
            mensaje: 'la solicitud semillero con el '+id+' no existe.',
            errors:{message: 'No existe una solicitud semillero con ese ID'}
        });
    }

    semillero.Id_Estudiante=body.Id_Estudiante;
    semillero.Id_Grupo= body.grupoinvestigacion;
    semillero.Id_Semi= body.Id_Semi;
    semillero.Actividad_Semi=body.Actividad_Semi;
    semillero.Proyecto_Semi=body.Proyecto_Semi;
    semillero.Objetivo_Semi= body.Objetivo_Semi;
    semillero.Objetivo_Especifico_Semi=body.Objetivo_Especifico_Semi;
    semillero.Justificacion_Semi= body.Justificacion_Semi;
    semillero.Estado_Semi=body.Estado_Semi;

    semillero.save((err,semilleroGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar solicitud semillero!',
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
                    mensaje: 'Error al buscar la solicitud de semillero por _id',
                    errors: err
                });
            }
            if (!semillero) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la solicitud de semillero con el _id ' + id + ' no existe',
                    errors: { message: 'No existe una solicitud de semillero con ese _id' }
                });
            }
            res.status(200).json({
            ok: true,
            semillero: semillero
            });
        })
    })
module.exports= app;


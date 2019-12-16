

var express = require('express');

var app= express();
var Semillero = require('../models/solicitudsemillero');

app.post('/',(req,res)=>{


    var body = req.body;

    var semillero = new Semillero({ //referencia a una variable de tipo usuario

        readicacion:body.readicacion,
        grupoinvestigacion: body.grupoinvestigacion,
        nombressemillero: body.nombressemillero,
        programaUniversitario: body.programaUniversitario,
        actividadessemillero:body.actividadessemillero,
        tutorsemillero:body.tutorsemillero,
        tematicaproyecto:body.tematicaproyecto,
        objetivosgeneral: body.objetivosgeneral,
        objetivosespecificos:body.objetivosespecificos,
        justificacion: body.justificacion
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


    semillero.grupoinvestigacion= body.grupoinvestigacion;
    semillero.nombressemillero= body.nombressemillero;
    semillero.programaUniversitario= body.programaUniversitario;
    semillero.actividadessemillero=body.actividadessemillero;
    semillero.tutorsemillero=body.tutorsemillero;
    semillero.tematicaproyecto=body.tematicaproyecto;
    semillero.objetivosgeneral= body.objetivosgeneral;
    semillero.objetivosespecificos=body.objetivosespecificos;
    semillero.justificacion= body.justificacion;
    semillero.estado=body.estado;

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




var express = require('express');

var app= express();
var Semillero = require('../models/semillero');

app.post('/',(req,res)=>{


    var body = req.body;

    var semillero = new Semillero({ //referencia a una variable de tipo usuario

        Nombre_Semi: body.nombre,
        Director_Semi: body.Director_Semi,
        Tema_Semi: body.Tema_Semi,
        Descripcion_Semi:body.Descripcion_Semi,
        Id_Grupo:body.Id_Grupo
        
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


    semillero.Nombre_Semi = body.Nombre_Semi;
    semillero.Director_Semi= body.Director_Semi;
    semillero.Tema_Semi = body.Tema_Semi;
    semillero.Descripcion_Semi=body.Descripcion_Semi;
    semillero.Id_Grupo=body.Id_Grupo;
    semillero.Estado_Semi=body.Estado_Semi;

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


app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    // CAMBIO!!! -*-*-*-*-*-*-*
    Semillero.find({}, 'Nombre_Semi Director_Semi Tema_Semi Descripcion_Semi Id_Grupo Estado_Semi').skip(desde).limit(99).exec(
        (err, semillero) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando programas!',
                    errors: err
                });
            }


            Semillero.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    semillero: semillero,
                    total: conteo
                });
            })




        }); //Metodo de mongoose.





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


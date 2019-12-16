

var express = require('express');

var app= express();
var Grupo = require('../models/grupo_inv');

app.post('/',(req,res)=>{


    var body = req.body;

    var grupo_investigacion = new Grupo({ //referencia a una variable de tipo usuario

        Nombre_Grupo: body.Nombre_Grupo,
        Director_Grupo: body.Director_Grupo,
        Tema_Grupo: body.Tema_Grupo,
        Descripcion_Grupo:body.Descripcion_Grupo
        
    }); 


    grupo_investigacion.save((err,solicitudGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al enviar solicitud semillero!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            grupo_investigacion: solicitudGuardado,
            usuariotoken: req.grupo_investigacion
        });


    });
    
});
app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

Grupo.findById(id,(err,grupo_inv)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar grupo de investigacion!',
            errors:err
        });
    }

    if(!grupo_inv){
        return res.status(400).json({
            ok:false,
            mensaje: 'El grupo de investigacion con el '+id+' no existe.',
            errors:{message: 'No existe un grupo de investigacion con ese ID'}
        });
    }


    grupo_inv.Nombre_Grupo = body.Nombre_Grupo;
    grupo_inv.Director_Grupo= body.Director_Grupo;
    grupo_inv.Tema_Grupo = body.Tema_Grupo;
    grupo_inv.Descripcion_Grupo=body.Descripcion_Grupo;
    grupo_inv.Estado=body.Estado;
    //semillero.grupo_inv=body.grupo_inv;

    grupo_inv.save((err,grupoGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar grupo de investigacion!',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            grupo_inv: grupoGuardado
        });


    });





});
  

});


app.get('/', (req, res, next) => {



    var desde = req.query.desde || 0;
    desde = Number(desde);

    // CAMBIO!!! -*-*-*-*-*-*-*
    Grupo.find({}, 'Nombre_Grupo Director_Grupo Tema_Grupo Descripcion_Grupo Estado_Grupo').skip(desde).limit(99).exec(
        (err, grupo) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando programas!',
                    errors: err
                });
            }


            Grupo.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    grupo: grupo,
                    total: conteo
                });
            })




        }); //Metodo de mongoose.





});


app.get('/id/:_id', (req, res) => {
    var _id = req.params._id;
    Grupo.findOne({_id:_id})
    .populate('usuario', '_id')
        .exec((err, grupo_inv) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar grupo de investigacion por _id',
                    errors: err
                });
            }
            if (!grupo_inv) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El grupo de investigacion con el _id ' + id + ' no existe',
                    errors: { message: 'No existe un grupo de investigacion  con ese _id' }
                });
            }
            res.status(200).json({
            ok: true,
            grupo_inv: grupo_inv
            });
        })
    })

module.exports= app;
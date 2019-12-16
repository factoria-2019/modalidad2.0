
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app= express();
var Requisitos = require('../models/requisitos')
app.post('/',(req,res)=>{


    var body = req.body;

    var requisitos = new Requisitos({ //referencia a una variable de tipo usuario

        ficha_academica: body.ficha_academica,
        semillero_activo: body.semillero_activo,
        proyecto_financiado: body.proyecto_financiado,
        articulo_cientifico:body.articulo_cientifico,
        ponencia:body.ponencia,
        estado:body.estado,
    }); 

    requisitos.save((err,requisitosGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al enviar requisitos!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            requisitos: requisitosGuardado,
            usuariotoken: req.requisitos
        });


    });
    
});


app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

Requisitos.findById(id,(err,requisitos)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar requisitos!',
            errors:err
        });
    }

    if(!requisitos){
        return res.status(400).json({
            ok:false,
            mensaje: 'los requisitos con el '+id+' no existe.',
            errors:{message: 'No existe un requisitos con ese ID'}
        });
    }


    requisitos.ficha_academica= body.ficha_academica;
    requisitos.semillero_activo= body.semillero_activo;
    requisitos.proyecto_financiado= body.proyecto_financiado;
    requisitos.articulo_cientifico=body.articulo_cientifico;
    requisitos.ponencia=body.ponencia;
    requisitos.estado=body.estado;

    requisitos.save((err,requisitosGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar requisitos!',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            requisitos: requisitosGuardado
        });


    });





});
  

});
app.get('/id/:_id', (req, res) => {
    var _id = req.params._id;
    Requisitos.findOne({_id:_id})
    .populate('usuario', '_id')
        .exec((err, requisitos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar requisitos por _id',
                    errors: err
                });
            }
            if (!requisitos) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'los requisitos con el _id ' + id + ' no existe',
                    errors: { message: 'No existe requisitos con ese _id' }
                });
            }
            res.status(200).json({
            ok: true,
            requisitos: requisitos
            });
        })
    })
module.exports= app;

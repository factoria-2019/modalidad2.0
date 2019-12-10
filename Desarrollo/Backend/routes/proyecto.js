var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app = express();

var Proyecto = require('../models/proyecto');

//===============================================
//  Obteber todos los proyectos
//===============================================




app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);
    Proyecto.find({}, 'tema palabraClave1 palabraClave2 palabraClave3 rutaProyecto estado').skip(desde).limit(5).exec(
        (err, proyectos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando proyectos!',
                    errors: err
                });
            }


            Proyecto.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    proyecto: proyectos,
                    total: conteo
                });
            })




        }); //Metodo de mongoose.





});


//===============================================
//  Actualizar proyectos
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Proyecto.findById(id, (err, proyecto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar proyectos!',
                errors: err
            });
        }

        if (!proyecto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'EL proyecto con el ' + id + ' no existe.',
                errors: { message: 'No existe un proyecto con ese ID' }
            });
        }

        //tema palabraClave1 palabraClave2 palabraClave3 rutaProyecto estado
        proyecto.tema = body.tema;
        proyecto.palabraClave1 = body.palabraClave1;
        proyecto.palabraClave2 = body.palabraClave2;
        proyecto.palabraClave3 = body.palabraClave3;
        proyecto.rutaProyecto = body.rutaProyecto;
        proyecto.estado = body.estado;

        proyecto.save((err, proyectoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar proyecto!',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                proyecto: proyectoGuardado
            });


        });





    });


});






//===============================================
//  Crear un nuevo proyecto
//===============================================

app.post('/', (req, res) => {


    var body = req.body;

    var proyecto = new Proyecto({ //referencia a una variable de tipo proyecto

        tema: body.tema,
        palabraClave1: body.palabraClave1,
        palabraClave2: body.palabraClave2,
        palabraClave3: body.palabraClave3,
        rutaProyecto: body.rutaProyecto,
        estado: body.estado
    });

    proyecto.save((err, proyectoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear proyectos!',
                errors: err
            });

        }
        res.status(201).json({
            ok: true,
            proyecto: proyectoGuardado,
            usuariotoken: req.usuario
        });


    });

});




//===============================================
//  Eliminar proyectos por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {

    var id = req.params.id; // id por el /:id.


    Proyecto.findByIdAndRemove(id, (err, proyectoBorrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar proyecto!',
                errors: err
            });
        }

        if (!proyectoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un proyecto con este id: ' + id + '.',
                errors: { message: 'No existe un proyecto con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            proyecto: proyectoBorrado
        });




    });


});



module.exports = app;
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var mdAutenticacion = require('../middlewares/autenticacion');
// var SEED = require('../config/config').SEED;

var express = require('express');
var app = express();
var Solicitud = require('../models/solicitud');

//===============================================
//  Obteber todos los solicitudes
//===============================================

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Solicitud.find({}, 'tipoModalidad tituloProyecto estudiante1 estudiante2 estudiante3 consejero1 consejero2 consejero3 jefePrograma anteproyecto proyecto articulo').skip(desde).limit(50).exec(
        (err, solicitudes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando solicitudes!',
                    errors: err
                });
            }
            Solicitud.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    solicitud: solicitudes,
                    total: conteo
                });
            })
        }); //Metodo de mongoose.
});


//===============================================
//  Actualizar solicitudes
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Solicitud.findById(id, (err, solicitud) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitudes!',
                errors: err
            });
        }

        if (!solicitud) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La solicitud con el ' + id + ' no existe.',
                errors: { message: 'No existe una solicitud con ese ID' }
            });
        }

        solicitud.tipoModalidad = body.tipoModalidad;
        solicitud.tituloProyecto = body.tituloProyecto;
        solicitud.estudiante1 = body.estudiante1;
        solicitud.estudiante2 = body.estudiante2;
        solicitud.estudiante3 = body.estudiante3;
        solicitud.consejero1 = body.consejero1;
        solicitud.consejero2 = body.consejero2;
        solicitud.consejero3 = body.consejero3;
        solicitud.jefePrograma = body.jefePrograma;
        solicitud.anteproyecto = body.anteproyecto;
        solicitud.proyecto = body.proyecto;
        solicitud.articulo = body.articulo;

        solicitud.save((err, solicitudGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar solicitud!',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                solicitud: solicitudGuardada
            });
        });
    });
});

//===============================================
//  Crear un nuevo solicitud
//===============================================

app.post('/', (req, res) => {
    var body = req.body;

    var solicitud = new Solicitud({ //referencia a una variable de tipo solicitud
        tipoModalidad: body.tipoModalidad,
        tituloProyecto: body.tituloProyecto,
        estudiante1: body.estudiante1,
        estudiante2: body.estudiante2,
        estudiante3: body.estudiante3,
        consejero1: body.consejero1,
        consejero2: body.consejero2,
        consejero3: body.consejero3,
        jefePrograma: body.jefePrograma,
        anteproyecto: body.anteproyecto,
        proyecto: body.proyecto,
        articulo: body.articulo
    });
    

    solicitud.save((err, solicitudGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear solicitudes!',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            solicitud: solicitudGuardada,
            usuariotoken: req.usuario
        });
    });
});

//===============================================
//  Eliminar solicitudes por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {
    var id = req.params.id; // id por el /:id.

    Solicitud.findByIdAndRemove(id, (err, solicitudBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar solicitud!',
                errors: err
            });
        }
        if (!solicitudBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un solicitud con este id: ' + id + '.',
                errors: { message: 'No existe un solicitud con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            solicitud: solicitudBorrada
        });
    });
});

module.exports = app;
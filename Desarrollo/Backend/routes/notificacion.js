// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var mdAutenticacion = require('../middlewares/autenticacion');
// var SEED = require('../config/config').SEED;

var express = require('express');
var app = express();
var Notificacion = require('../models/notificacion');

//===============================================
//  Obteber todos los notificaciones
//===============================================

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Notificacion.find({}, 'emisor receptor tipoNotificacionEmisor tipoNotificacionReceptor').skip(desde).exec(
        (err, notificaciones) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando notificaciones!',
                    errors: err
                });
            }
            Notificacion.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    notificacion: notificaciones,
                    total: conteo
                });
            })
        }); //Metodo de mongoose.
});


//===============================================
//  Actualizar notificaciones
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Notificacion.findById(id, (err, notificacion) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar notificaciones!',
                errors: err
            });
        }

        if (!notificacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La notificación con el ' + id + ' no existe.',
                errors: { message: 'No existe un notificación con ese ID' }
            });
        }

        // emisor receptor tipoNotificacion
        notificacion.emisor = body.emisor;
        notificacion.receptor = body.receptor;
        notificacion.tipoNotificacionEmisor = body.tipoNotificacionEmisor;
        notificacion.tipoNotificacionReceptor = body.tipoNotificacionReceptor;
        notificacion.save((err, notificacionGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar notificacion!',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                notificacion: notificacionGuardada
            });
        });
    });
});

//===============================================
//  Crear un nuevo notificacion
//===============================================

app.post('/', (req, res) => {
    var body = req.body;

    var notificacion = new Notificacion({ //referencia a una variable de tipo notificacion
        emisor: body.emisor,
        receptor: body.receptor,
        tipoNotificacionEmisor: body.tipoNotificacionEmisor,
        tipoNotificacionReceptor: body.tipoNotificacionReceptor

    });

    notificacion.save((err, notificacionGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear notificaciones!',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            notificacion: notificacionGuardada,
            usuariotoken: req.usuario
        });
    });
});

//===============================================
//  Eliminar notificaciones por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {
    var id = req.params.id; // id por el /:id.

    Notificacion.findByIdAndRemove(id, (err, notificacionBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar notificacion!',
                errors: err
            });
        }
        if (!notificacionBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un notificacion con este id: ' + id + '.',
                errors: { message: 'No existe un notificacion con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            notificacion: notificacionBorrada
        });
    });
});

module.exports = app;
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app = express();

var programaUniversitario = require('../models/programaUniversitario');
var Usuario = require('../models/usuario');

//===============================================
//  Obteber todos los programas
//===============================================




app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    // CAMBIO!!! -*-*-*-*-*-*-*
    programaUniversitario.find({}, 'SNIES nombre numCreditos nivelAcademico tituloOtogado modalidadFormacion jefePrograma').skip(desde).limit(5).exec(
        (err, programa) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando programas!',
                    errors: err
                });
            }


            programaUniversitario.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    programa: programa,
                    total: conteo
                });
            })




        }); //Metodo de mongoose.





});




//===============================================
//  Actualizar programas
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    programaUniversitario.findById(id, (err, programa) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar programas!',
                errors: err
            });
        }

        if (!programa) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El programa con el ' + id + ' no existe.',
                errors: { message: 'No existe un programa con ese ID' }
            });
        }


        programa.SNIES = body.SNIES;
        programa.nombre = body.nombre;
        programa.numCreditos = body.numCreditos;
        programa.nivelAcademico = body.nivelAcademico;
        programa.tituloOtogado = body.tituloOtogado;
        programa.modalidadFormacion = body.modalidadFormacion;
        programa.jefePrograma = body.jefePrograma;

        programa.save((err, programaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar programas!',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                programa: programaGuardado
            });


        });



    });


});






//===============================================
//  Crear un nuevo programa
//===============================================

app.post('/', (req, res) => {


    var body = req.body;

    // SNIES nombre numCreditos nivelAcademico tituloOtogado modalidadFormacion

    var programa = new programaUniversitario({ //referencia a una variable de tipo usuario

        SNIES: body.SNIES,
        nombre: body.nombre,
        numCreditos: body.numCreditos,
        nivelAcademico: body.nivelAcademico,
        tituloOtogado: body.tituloOtogado,
        modalidadFormacion: body.modalidadFormacion,
        jefePrograma: body.jefePrograma
    });

    programa.save((err, programaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear programas!',
                errors: err
            });

        }
        res.status(201).json({
            ok: true,
            programa: programaGuardado,
            usuariotoken: req.usuario
        });


    });

});




//===============================================
//  Eliminar programas por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {

    var id = req.params.id; // id por el /:id.


    programaUniversitario.findByIdAndRemove(id, (err, programaBorrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar programas!',
                errors: err
            });
        }

        if (!programaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un programa con este id: ' + id + '.',
                errors: { message: 'No existe un programa con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            programa: programaBorrado
        });




    });


});



module.exports = app;
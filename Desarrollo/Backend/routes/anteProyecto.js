var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app = express();

var AnteProyecto = require('../models/anteProyecto');

//===============================================
//  Obteber todos los anteProyectos
//===============================================




app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);
    AnteProyecto.find({}, 'rutaAnteproyecto estado').skip(desde).limit(5).exec(
        (err, anteproyectos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando anteproyectos!',
                    errors: err
                });
            }


            AnteProyecto.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    anteproyecto: anteproyectos,
                    total: conteo
                });
            })




        }); //Metodo de mongoose.





});


//===============================================
//  Actualizar anteproyectos
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    AnteProyecto.findById(id, (err, anteproyecto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar anteproyectos!',
                errors: err
            });
        }

        if (!anteProyecto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'EL anteproyecto con el ' + id + ' no existe.',
                errors: { message: 'No existe un anteproyecto con ese ID' }
            });
        }

        //rutaAnteproyecto estado
        anteproyecto.rutaAnteproyecto = body.rutaAnteproyecto;
        anteproyecto.estado = body.estado;

        anteproyecto.save((err, anteproyectoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar anteproyecto!',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                anteProyecto: anteproyectoGuardado
            });


        });





    });


});






//===============================================
//  Crear un nuevo anteproyecto
//===============================================

app.post('/', (req, res) => {


    var body = req.body;

    var anteProyecto = new AnteProyecto({ //referencia a una variable de tipo anteProyecto

        rutaAnteproyecto: body.rutaAnteproyecto,
        estado: body.estado
    });

    anteProyecto.save((err, anteProyectoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear anteProyectos!',
                errors: err
            });

        }
        res.status(201).json({
            ok: true,
            anteProyecto: anteProyectoGuardado,
            usuariotoken: req.usuario
        });


    });

});




//===============================================
//  Eliminar anteproyectos por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {

    var id = req.params.id; // id por el /:id.


    AnteProyecto.findByIdAndRemove(id, (err, anteProyectoBorrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar anteProyecto!',
                errors: err
            });
        }

        if (!anteProyectoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un anteProyecto con este id: ' + id + '.',
                errors: { message: 'No existe un anteProyecto con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            anteProyecto: anteProyectoBorrado
        });




    });


});



module.exports = app;
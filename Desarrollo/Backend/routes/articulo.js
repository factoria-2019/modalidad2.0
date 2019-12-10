var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app = express();

var Articulo = require('../models/articulo');

//===============================================
//  Obteber todos los articulos
//===============================================




app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);
    Articulo.find({}, 'rutaArticulo estado').skip(desde).limit(5).exec(
        (err, articulos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando articulos!',
                    errors: err
                });
            }


            Articulo.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    articulo: articulos,
                    total: conteo
                });
            })




        }); //Metodo de mongoose.





});


//===============================================
//  Actualizar articulos
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Articulo.findById(id, (err, articulo) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar articulos!',
                errors: err
            });
        }

        if (!articulo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'EL articulo con el ' + id + ' no existe.',
                errors: { message: 'No existe un articulo con ese ID' }
            });
        }

        //rutaArticulo estado
        articulo.rutaArticulo = body.rutaArticulo;
        articulo.estado = body.estado;

        articulo.save((err, articuloGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar articulo!',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                articulo: articuloGuardado
            });


        });





    });


});






//===============================================
//  Crear un nuevo articulo
//===============================================

app.post('/', (req, res) => {


    var body = req.body;

    var articulo = new Articulo({ //referencia a una variable de tipo articulo

        rutaArticulo: body.rutaArticulo,
        estado: body.estado
    });

    articulo.save((err, articuloGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear articulos!',
                errors: err
            });

        }
        res.status(201).json({
            ok: true,
            articulo: articuloGuardado,
            usuariotoken: req.usuario
        });


    });

});




//===============================================
//  Eliminar articulos por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {

    var id = req.params.id; // id por el /:id.


    Articulo.findByIdAndRemove(id, (err, articuloBorrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar articulo!',
                errors: err
            });
        }

        if (!articuloBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un articulo con este id: ' + id + '.',
                errors: { message: 'No existe un articulo con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            articulo: articuloBorrado
        });




    });


});



module.exports = app;
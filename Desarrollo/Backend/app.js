// Requires 

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Inicializar variables

var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET ,PUT ,DELETE, OPTIONS");

    next();
});


//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Importar Rutas

var appRoutes = require('./routes/app');

var sedeUniversitaria = require('./routes/sedeUniversitaria');
var programaUniversitario = require('./routes/programaUniversitario');
var facultad = require('./routes/facultad');
var solicitud = require('./routes/solicitud');
var anteProyecto = require('./routes/anteProyecto');
var proyecto = require('./routes/proyecto');
var articulo = require('./routes/articulo');
var notificacion = require('./routes/notificacion');

var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
//busqueda
var busquedaRoutes = require('./routes/busqueda');
//subir archivos
var uploadRoutes = require('./routes/upload');

var imagenesRoutes = require('./routes/imagenes');

//Conexion a la base de datos.

//--------- Cambiar nombre a BPUS !!!!!!! ---------------
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    //--------- Cambiar nombre a BPUS !!!!!!! ---------------

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Server index config
/*

// Genera una pequeña interfaz para las carpetas de las imagenes
// Nota: Si alguien sabe la ruta puede ver cualquier imagen, no se recomienda esta practica.
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));*/


//Rutas


app.use('/sedeUniversitaria', sedeUniversitaria);
app.use('/programaUniversitario', programaUniversitario);
app.use('/facultad', facultad);
app.use('/solicitud', solicitud);
app.use('/anteProyecto', anteProyecto);
app.use('/proyecto', proyecto);
app.use('/articulo', articulo);
app.use('/notificacion', notificacion);

app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);

//Escuchar peticiones

app.listen(3000, () => {

    console.log('Express server puerto: \x1b[32m%s\x1b[0m', 'online');

});
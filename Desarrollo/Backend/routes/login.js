
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app= express();

var Usuario= require('../models/usuario');


//google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
var mdAutentication = require('../middlewares/autenticacion');
//===============================================
//  Renueva token
//===============================================
app.get('/renuevatoken', mdAutentication.verificarToken,(req,res)=>{
    var token = jwt.sign({usuario: req.usuario},SEED,{expiresIn:14400}); // 4 horas y luego expirara el token.
     res.status(200).json({
        ok:true,
        token:token
    });

});


//===============================================
//  Autenticacion normal
//===============================================

app.post('/',(req,res)=>{

    var body = req.body;

    Usuario.findOne({numDocumento:body.numDocumento},(err,usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al buscar usuarios!',
                errors:err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                mensaje: 'Credenciales no validas- Numero de documento.',
                errors:err
            });
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                mensaje: 'Credenciales no validas-password.',
                errors:err
            });

        }

        //crear un token!!!


        usuarioDB.password=':)';
        var token = jwt.sign({usuario: usuarioDB},SEED,{expiresIn:14400}); // 4 horas y luego expirara el token.



        res.status(200).json({
            ok:true,
            Usuario:usuarioDB,
            token:token,
            id:usuarioDB.id,
            menu:obtenerMenu(usuarioDB.role)
        });

    });


   


});



function obtenerMenu(ROLE) {
   var menu=[
        {
          titulo:'',
          icono:'mdi mdi-gauge',
          submenu:[
            {titulo:' Inicio',url:'/search', icono:'fas fa-home'},
           /* {titulo:' Plantilla solicitud',url:'/solicitud', icono:'far fa-file-alt'},*/
            {titulo:' Proyecto',url:'/progreso', icono:'fas fa-file-invoice'}
            
            
            /*,{titulo:' Anteproyecto',url:'/anteproyecto', icono:'fas fa-pencil-alt'},
            {titulo:' Proyecto',url:'/proyecto', icono:'fas fa-puzzle-piece'},
            {titulo:' Artículo',url:'/articulo', icono:'fas fa-puzzle-piece'}*/
            
          ]
    
    
        },
        {
          titulo:'',
          icono:'mdi mdi-folder-lock-open',
          submenu:[
          
          ]
        }
      ];

     
      if (ROLE==="ADMIN_ROLE") {
          
        menu[1].submenu.push(
            
        {titulo:' Usuarios',url:'/admin/usuarios', icono:'fas fa-users'},
        
        {titulo:' Programas académicos',url:'/admin/programas', icono:'fas fa-chalkboard-teacher'},

        {titulo:' Sedes',url:'/admin/sedeUniversitaria', icono:'fas fa-city'},

        {titulo:' Facultad',url:'/admin/facultad', icono:'far fa-building'}
        
        
        );
       
      }

      

      return menu;
}


module.exports=app;
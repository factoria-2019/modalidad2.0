
var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app= express();
// Modelo importados
var Usuario = require('../models/usuario');

// default options
app.use(fileUpload());

app.put('/:tipo/:id',(req,res,next)=>{


    var tipo = req.params.tipo;
    var id = req.params.id;
    var tiposValidos = ['Estudiante','Docente','Jefe de programa']; // Tipos permitidos.


    if(tiposValidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok:false,
            mensaje: 'Tipo de coleccion no es valida.',
            errors:{message:'Tipo de coleccion no es valida.'}
        });
    }
    if(!req.files){
        return res.status(400).json({
            ok:false,
            mensaje: 'No selecciono nada.',
            errors:{message:'Debe seleccionar una imagen.'}
        });
    }

    // Obtener nombre del archivo.
    var archivo = req.files.imagen; // .imagen <- Es el nombre de la key.
    var nombreCortado = archivo.name.split('.');//Arreglo separados por puntos.
    var extensionArchivo= nombreCortado[nombreCortado.length-1]; //La ultima posicion es la extension
    var extensionValidas = ['pdf','docx','png']; // Extensiones permitidas.

    if(extensionValidas.indexOf(extensionArchivo)<0){
        return res.status(400).json({
            ok:false,
            mensaje: 'Extension no valida.',
            errors:{message:'Las extensiones validas son '+extensionValidas.join(', ')}
        });
    }
    // Nombre de archivos personalizado
    //1346464-123.png

    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`; // Nuevo nombre del archivo subido.

    // Mover el archivo temporal a un patch.
    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path,err =>{ // Mueve el archivo a la ruta (path), si no se muestra el (err) 
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al mover archivos.',
                errors:err
            }); 
        }


        subirPorTipo(tipo,id,nombreArchivo,res);

       /* res.status(200).json({
            ok:true,
            mensaje: 'Movio el archivo exitosamente ',
            extensionArchivo: extensionArchivo
        }); */
        


    });


    
    });


    function subirPorTipo(tipo,id,nombreArchivo,res){

        if(tipo ==='Estudiante'){

            Usuario.findById(id,(err,usuario)=>{


                if(!usuario){
                    return res.status(400).json({
                        ok:false,
                        mensaje: 'Usuario no existe',
                        errors:{ message: 'Usuario no existe'}
                    }); 
                }

                var pathViejo = './uploads/usuarios/'+usuario.img;
               
                // Si existe, elimina la imagen anterior.
                if(fs.existsSync(pathViejo)){

                    fs.unlink(pathViejo);
                }

                usuario.img= nombreArchivo;

                usuario.save((err,usuarioActualizado)=>{

                    usuarioActualizado.password=':)';
                    return res.status(200).json({
                        ok:true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    }); 


                });

            });
        }
        if(tipo ==='Docente'){

            Usuario.findById(id,(err,usuario)=>{


                if(!usuario){
                    return res.status(400).json({
                        ok:false,
                        mensaje: 'Usuario no existe',
                        errors:{ message: 'Usuario no existe'}
                    }); 
                }

                var pathViejo = './uploads/usuarios/'+usuario.img;
               
                // Si existe, elimina la imagen anterior.
                if(fs.existsSync(pathViejo)){

                    fs.unlink(pathViejo);
                }

                usuario.img= nombreArchivo;

                usuario.save((err,usuarioActualizado)=>{

                    usuarioActualizado.password=':)';
                    return res.status(200).json({
                        ok:true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    }); 


                });

            });
        }

        if(tipo ==='Jefe de programa'){

            Usuario.findById(id,(err,usuario)=>{


                if(!usuario){
                    return res.status(400).json({
                        ok:false,
                        mensaje: 'Usuario no existe',
                        errors:{ message: 'Usuario no existe'}
                    }); 
                }

                var pathViejo = './uploads/usuarios/'+usuario.img;
               
                // Si existe, elimina la imagen anterior.
                if(fs.existsSync(pathViejo)){

                    fs.unlink(pathViejo);
                }

                usuario.img= nombreArchivo;

                usuario.save((err,usuarioActualizado)=>{

                    usuarioActualizado.password=':)';
                    return res.status(200).json({
                        ok:true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    }); 


                });

            });
        }
        
    }



    module.exports= app;
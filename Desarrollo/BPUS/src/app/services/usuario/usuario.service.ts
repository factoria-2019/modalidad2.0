import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/throw';


import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  totalUsuarios:number=0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    ) { // Inyectar servicios

    console.log('Servicio de usuario listo.');


    console.log(this.usuario);


    this.cargarStorage();
  }

  renuevaToken(){

    let url=URL_SERVICIOS+'/login/renuevatoken?token='+this.token;

    return this.http.get(url).map((resp:any)=>{

      this.token=resp.token;
      localStorage.setItem('token',this.token);
      console.log('token renovado');
      return true;
    }).catch(err =>{
      this.router.navigate(['/login']);
      swal.fire('No se pudo renovar token','No fue posible renovar token.','error');
      return Observable.throw(err);

    });
  }

  estaLogueado(){


    return (this.token.length>5)?true:false; // Operador ternario.
  }

  cargarStorage(){

    if (localStorage.getItem('token')) {
      
      this.token=localStorage.getItem('token');
     // console.log(localStorage.getItem('usuario'));

      this.usuario = JSON.parse(localStorage.getItem('usuario')); //Aqui esta el error.
      this.menu = JSON.parse(localStorage.getItem('menu')); //Aqui esta el error.

      
    }else{
      
      this.token='';
      this.usuario=null;
      this.menu=[];

    }

  }

  guardarStorage(id:string,token:string,usuario:Usuario,menu:any){

    localStorage.setItem('id',id);
    localStorage.setItem('token',token);

    //console.log(JSON.stringify(usuario)+" LALALALLA");
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('menu',JSON.stringify(menu));
    
    this.usuario=usuario;
    this.token=token;
    this.menu=menu;
    
  }

  logout(){

    this.usuario=null;
    this.token='';
    this.menu=[];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');

    this.router.navigate(['/search']);
    
  }



  paginadoRegistro1a2(usuario:Usuario){

    localStorage.setItem('email',usuario.email);
    localStorage.setItem('password',usuario.password);

  }

  paginadoRegistro2a3(usuario:Usuario){

    localStorage.setItem('tipoUsuario',usuario.tipoUsuario);
    localStorage.setItem('codigoUniversitario',usuario.codigoUniversitario);
    localStorage.setItem('tipoID',usuario.tipoID);
    localStorage.setItem('numDocumento',usuario.numDocumento);
               

  }

  removerRegistroStorage(){
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('codigoUniversitario');
    localStorage.removeItem('tipoID');
    localStorage.removeItem('numDocumento');
  }

  login( usuario: Usuario) {

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.Usuario,resp.menu );
                 
                  return true;
                }).catch(err =>{
                  swal.fire('Error en el login',err.error.mensaje,'error');
                  return Observable.throw(err);

                });

                

  }


  crearUsuario(usuario:Usuario){

    let url=URL_SERVICIOS+'/usuario';
   
    return this.http.post(url, usuario)
    .map((resp:any)=>{
      swal.fire('Usuario creado',usuario.email,'success');
      return resp.usuario;

    }).catch(err =>{
      //console.log(err.error.mensaje);
      swal.fire(err.error.mensaje,err.error.errors.message,'error');
      return Observable.throw(err);

    });

  }


  actualizarUsuario(usuario:Usuario){
   // console.log(usuario._id);
    let url = URL_SERVICIOS+'/usuario/'+usuario._id+'?token='+this.token;
    
   // console.log(url);

    return this.http.put(url,usuario)
                    .map((resp:any)=>{

                      if (usuario._id===this.usuario._id) {
                        let usuarioDB:Usuario=resp.usuario;
                        this.guardarStorage(usuarioDB._id,this.token,usuarioDB,this.menu);
                      }
                      
                           
                      swal.fire('Usuario actualizado',usuario.nombres,'success');

                      return true;
                    }).catch(err =>{
                      //console.log(err.error.mensaje);
                      swal.fire(err.error.mensaje,err.error.errors.message,'error');
                      return Observable.throw(err);
                
                    });

  }

  obtenerJefePrograma( numDocumento: string ){

    let url = URL_SERVICIOS+'/usuario/'+numDocumento;

    return this.http.get(url).map((resp:any) => resp.usuario);
  }

/*  // AGREGAR PARA LOS PDFS DESPUES 
  cambiarImagen(archivo:File,id:string){


    this._subirArchivoService.subirArcivo(archivo,'usuarios',id)
                            .then((resp:any)=>{

                              this.usuario.img=resp.usuario.img;
                              swal.fire('Imagen actualizada',this.usuario.nombres,'success');

                              this.guardarStorage(id,this.token,this.usuario,this.menu);

                            }).catch(resp =>{


                                console.log(resp);
                            });

  }
*/
  cargarUsuarios(desde:number=0){


    let url=URL_SERVICIOS+'/usuario?desde='+desde;
    return this.http.get(url).map((resp:any) =>{

      this.totalUsuarios=resp.total;
      return resp.usuarios;


    });
  }

  buscarUsuarios(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url).map((resp:any)=>resp.usuarios);

  }


  borrarUsuario(id:string){

    let url=URL_SERVICIOS+'/usuario/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Usuario borrado','El usuario ha sido eliminado correctamente','success');
              return true;
        });

  }


}

import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Sede } from 'src/app/models/sede.model';
@Injectable()
export class SedeService {

  sede: Sede;
  token: string;
  menu: any[] = [];
  totalSedes:number=0;

  constructor(
    public http: HttpClient,
    public router: Router
    ) { 

    console.log('Servicio de usuario listo.');


    console.log(this.sede);


  }

  crearSede(sede:Sede){

    let url=URL_SERVICIOS+'/sedeUniversitaria';
   
    return this.http.post(url, sede)
    .map((resp:any)=>{
      swal.fire('Sede creada',sede.nombre,'success');
      return resp.usuario;

    }).catch(err =>{
      swal.fire(err.error.mensaje,err.error.errors.message,'error');
      return Observable.throw(err);

    });

  }


  actualizarSede(sede:Sede){

    let url = URL_SERVICIOS+'/sedeUniversitaria/'+sede._id+'?token='+this.token;

    return this.http.put(url, sede)
                    .map((resp: any) => {
                      /*
                      *****arreglar el if*****
                      if (sede._id === this.sede._id) {
                        let usuarioDB:Usuario = resp.usuario;
                      }
                      */
                      swal.fire('Sede actualizada', sede.nombre, 'success');
                      return true;
                    }).catch(err =>{
                      swal.fire('Error al actualizar', sede.nombre, 'error');
                      return Observable.throw(err);
                    });

  }
  cargarSedes(desde:number=0){


    let url=URL_SERVICIOS+'/sedeUniversitaria?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalSedes=resp.total;
      return resp.sede;


    });
  }

  buscarSedes(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/sedeUniversitaria/'+termino;
    return this.http.get(url).map((resp:any)=>resp.usuarios);

  }


  borrarSedes(id:string){

    let url=URL_SERVICIOS+'/sedeUniversitaria/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Sede borrada','La sede ha sido eliminado correctamente','success');
              return true;
        });

  }


}

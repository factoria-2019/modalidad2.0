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
import { Facultad } from 'src/app/models/facultad.model';


@Injectable()
export class FacultadService {

  facultad: Facultad;
  token: string;
  menu: any[] = [];
  totalFacultades:number=0;

  constructor(
    public http: HttpClient,
    public router: Router
    ) { // Inyectar servicios

    console.log('Servicio de usuario listo.');


    console.log(this.facultad);


  }


 
  crearFacultad(facultad: Facultad) {

    let url = URL_SERVICIOS + '/facultad';
   
    return this.http.post(url, facultad)
    .map((resp: any) => {
      swal.fire('Facultad creada', facultad.email, 'success');
      return resp.facultad;

    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje,err.error.errors.message,'error');
      return Observable.throw(err);

    });

  }


  actualizarFacultad(facultad:Facultad){
   // console.log(usuario._id);
    let url = URL_SERVICIOS+'/facultad/'+facultad._id+'?token='+this.token;
    
   // console.log(url);

    return this.http.put(url, facultad)
                    .map((resp: any) => {
                      /*
                      ***REVISAR**
                      if (facultad._id===this.facultad._id) {
                        let facultadDB:Facultad=resp.facultad;
                      }
                      */
                      swal.fire('La facultad ha sido actualizada', facultad.nombre, 'success');

                      return true;
                    }).catch(err =>{
                      // console.log(err.error.mensaje);
                      swal.fire('Error al actualizar facultad', facultad.nombre, 'error');
                      return Observable.throw(err);
                
                    });

  }
  cargarFacultades(desde:number=0){


    let url=URL_SERVICIOS+'/facultad?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalFacultades=resp.total;
      return resp.facultad;


    });
  }

  buscarFacultades(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/facultad/'+termino;
    return this.http.get(url).map((resp:any)=>resp.usuarios);

  }


  borrarFacultades(id:string){

    let url=URL_SERVICIOS+'/facultad/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Facultad borrada','La facultad ha sido eliminado correctamente','success');
              return true;
        });

  }


}

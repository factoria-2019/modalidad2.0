/*
* Proyecto: BPUS
* Componente: proyecto.service.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: servicios crud del proyecto
* Última modificación: 06/08/2019
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Proyecto } from 'src/app/models/proyecto.model';


@Injectable()
export class ProyectoService {

  proyecto: Proyecto;
  token: string;
  menu: any[] = [];
  totalProyectos = 0;

  constructor(public http: HttpClient, public router: Router) { // Inyectar servicios
    console.log('Servicio de proyecto listo.');
    console.log(this.proyecto);
  }

  crearProyecto(proyecto: Proyecto) {
    const url = URL_SERVICIOS + '/proyecto';
    return this.http.post(url, proyecto).map((resp: any) => {
      swal.fire('Proyecto creado', 'success');
      return resp.proyecto;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarProyecto(proyecto: Proyecto) {
    const url = URL_SERVICIOS + '/proyecto/' + proyecto._id + '?token=' + this.token;
    return this.http.put(url, proyecto).map((resp: any) => {
      swal.fire('El proyecto ha sido actualizado', 'success');
      return true;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire('Error al actualizar proyecto', proyecto._id, 'error');
      return Observable.throw(err);
    });
  }

  cargarProyectos(desde: number= 0) {
    const url = URL_SERVICIOS + '/proyecto?desde=' + desde;
    return this.http.get(url) .map((resp: any) => {
      this.totalProyectos = resp.total;
      return resp.proyecto;
    });
  }

  /*
  ***No creo que vaya a ser usado por el momento***
  buscarProyectos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/proyecto/' + termino;
    return this.http.get(url).map((resp: any) => resp.usuarios);
  }
  */

  borrarProyectos(id: string) {
    const url = URL_SERVICIOS + '/proyecto/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal.fire('Proyecto borrado', 'El proyecto ha sido eliminado correctamente', 'success');
      return true;
    });
  }

}

/*
* Proyecto: BPUS
* Componente: anteproyecto.service.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: servicios crud del anteproyecto
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
import { AnteProyecto } from 'src/app/models/anteproyecto.model';


@Injectable()
export class AnteProyectoService {

  anteProyecto: AnteProyecto;
  token: string;
  menu: any[] = [];
  totalAnteProyectos = 0;

  constructor(public http: HttpClient, public router: Router) { // Inyectar servicios
    console.log('Servicio de anteproyecto listo.');
    console.log(this.anteProyecto);
  }

  crearAnteProyecto(anteProyecto: AnteProyecto) {
    const url = URL_SERVICIOS + '/anteProyecto';
    return this.http.post(url, anteProyecto).map((resp: any) => {
      swal.fire('Anteproyecto creado', 'success');
      return resp.anteProyecto;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarAnteProyecto(anteProyecto: AnteProyecto) {
    const url = URL_SERVICIOS + '/anteProyecto/' + anteProyecto._id + '?token=' + this.token;
    return this.http.put(url, anteProyecto).map((resp: any) => {
      swal.fire('El anteproyecto ha sido actualizado', 'success');
      return true;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire('Error al actualizar anteproyecto', anteProyecto._id, 'error');
      return Observable.throw(err);
    });
  }

  cargarAnteProyectos(desde: number= 0) {
    const url = URL_SERVICIOS + '/anteProyecto?desde=' + desde;
    return this.http.get(url) .map((resp: any) => {
      this.totalAnteProyectos = resp.total;
      return resp.anteProyecto;
    });
  }

  /*
  ***No creo que vaya a ser usado por el momento***
  buscarAnteProyectos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/anteProyecto/' + termino;
    return this.http.get(url).map((resp: any) => resp.usuarios);
  }
  */

  borrarAnteProyectos(id: string) {
    const url = URL_SERVICIOS + '/anteProyecto/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal.fire('Anteproyecto borrado', 'El anteproyecto ha sido eliminado correctamente', 'success');
      return true;
    });
  }

}

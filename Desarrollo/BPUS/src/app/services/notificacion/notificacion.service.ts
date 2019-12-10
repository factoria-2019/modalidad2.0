/*
* Proyecto: BPUS
* Componente: notificacion.service.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: servicios crud de la notificación
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
import { Notificacion } from 'src/app/models/notificacion.model';


@Injectable()
export class NotificacionService {

  notificacion: Notificacion;
  token: string;
  menu: any[] = [];
  totalNotificaciones = 0;

  constructor(public http: HttpClient, public router: Router) { // Inyectar servicios
    console.log('Servicio de notificación listo.');
    console.log(this.notificacion);
  }

  crearNotificacion(notificacion: Notificacion) {
    const url = URL_SERVICIOS + '/notificacion';
    return this.http.post(url, notificacion).map((resp: any) => {
      swal.fire('Notificación creada', 'success');
      return resp.notificacion;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarNotificacion(notificacion: Notificacion) {
    const url = URL_SERVICIOS + '/notificacion/' + notificacion._id + '?token=' + this.token;
    return this.http.put(url, notificacion).map((resp: any) => {
      swal.fire('La notificación ha sido actualizada', 'success');
      return true;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire('Error al actualizar notificación', notificacion._id, 'error');
      return Observable.throw(err);
    });
  }

  cargarNotificaciones(desde: number= 0) {
    const url = URL_SERVICIOS + '/notificacion?desde=' + desde;
    return this.http.get(url) .map((resp: any) => {
      this.totalNotificaciones = resp.total;
      return resp.notificacion;
    });
  }

  /*
  ***No creo que vaya a ser usado por el momento***
  buscarNotificacion(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/notificacion/' + termino;
    return this.http.get(url).map((resp: any) => resp.usuarios);
  }
  */

  borrarNotificaciones(id: string) {
    const url = URL_SERVICIOS + '/notificacion/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal.fire('Notificación borrada', 'La notificación ha sido eliminada correctamente', 'success');
      return true;
    });
  }

}

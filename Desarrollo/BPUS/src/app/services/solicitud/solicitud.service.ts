/*
* Proyecto: BPUS
* Componente: solicitud.service.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: servicios crud de la solicitud
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
import { Solicitud } from 'src/app/models/solicitud.model';


@Injectable()
export class SolicitudService {

  solicitud: Solicitud;
  token: string;
  menu: any[] = [];
  totalSolicitudes = 0;

  constructor(public http: HttpClient, public router: Router) { // Inyectar servicios
    console.log('Servicio de solicitud listo.');
    console.log(this.solicitud);
  }

  crearSolicitud(solicitud: Solicitud) {
    const url = URL_SERVICIOS + '/solicitud';
    return this.http.post(url, solicitud).map((resp: any) => {
      swal.fire('Solicitud creada', 'success');
      return resp.solicitud;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarSolicitud(solicitud: Solicitud) {
    const url = URL_SERVICIOS + '/solicitud/' + solicitud._id + '?token=' + this.token;
    return this.http.put(url, solicitud).map((resp: any) => {
      swal.fire('La solicitud ha sido actualizada', 'success');
      return true;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire('Error al actualizar solicitud', solicitud._id, 'error');
      return Observable.throw(err);
    });
  }

  cargarSolicitudes(desde: number= 0) {
    const url = URL_SERVICIOS + '/solicitud?desde=' + desde;
    return this.http.get(url) .map((resp: any) => {
      this.totalSolicitudes = resp.total;
      return resp.solicitud;
    });
  }

  /*
  ***No creo que vaya a ser usado por el momento***
  buscarSolicitud(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/solicitud/' + termino;
    return this.http.get(url).map((resp: any) => resp.usuarios);
  }
  */

  borrarSolicitudes(id: string) {
    const url = URL_SERVICIOS + '/solicitud/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal.fire('Solicitud borrada', 'La solicitud ha sido eliminada correctamente', 'success');
      return true;
    });
  }

}

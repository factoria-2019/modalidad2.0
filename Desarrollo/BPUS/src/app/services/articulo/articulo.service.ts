/*
* Proyecto: BPUS
* Componente: articulo.service.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: servicios crud del artículo
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
import { Articulo } from 'src/app/models/articulo.model';


@Injectable()
export class ArticuloService {

  articulo: Articulo;
  token: string;
  menu: any[] = [];
  totalArticulos = 0;

  constructor(public http: HttpClient, public router: Router) { // Inyectar servicios
    console.log('Servicio de artículo listo.');
    console.log(this.articulo);
  }

  crearArticulo(articulo: Articulo) {
    const url = URL_SERVICIOS + '/articulo';
    return this.http.post(url, articulo).map((resp: any) => {
      swal.fire('Artículo creado', 'success');
      return resp.articulo;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarArticulo(articulo: Articulo) {
    const url = URL_SERVICIOS + '/articulo/' + articulo._id + '?token=' + this.token;
    return this.http.put(url, articulo).map((resp: any) => {
      swal.fire('EL artículo ha sido actualizado', 'success');
      return true;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire('Error al actualizar artículo', articulo._id, 'error');
      return Observable.throw(err);
    });
  }

  cargarArticulos(desde: number= 0) {
    const url = URL_SERVICIOS + '/articulo?desde=' + desde;
    return this.http.get(url) .map((resp: any) => {
      this.totalArticulos = resp.total;
      return resp.articulo;
    });
  }

  /*
  ***No creo que vaya a ser usado por el momento***
  buscarArticulos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/articulo/' + termino;
    return this.http.get(url).map((resp: any) => resp.usuarios);
  }
  */

  borrarArticulos(id: string) {
    const url = URL_SERVICIOS + '/articulo/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal.fire('Artículo borrado', 'El artículo ha sido eliminado correctamente', 'success');
      return true;
    });
  }

}

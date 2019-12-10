import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { NotificacionService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})

export class NotificacionesComponent {
  notificaciones: Notificacion[]=[];
  cargando:boolean=true;
  notifiVacia:boolean=false;
  constructor(  public _notificacionService: NotificacionService) {

   }

   ngOnInit() {

    this.cargarNotificaciones();
    if (this.notificaciones.length===0) {
      this.notifiVacia=true;
    }
  }



  cargarNotificaciones(){
    this.cargando=true;
    this._notificacionService.cargarNotificaciones(0)
    .subscribe( notificaciones => this.notificaciones=notificaciones);  
    this.cargando=false;
  }

  
  aceptarNotificacion(notificacion:Notificacion){
    Swal.fire({
      title: '¿Está seguro que desea aprobar el proyecto?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Aprobarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   
      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{
          console.log(resp);
          this.cargarNotificaciones();});
    }

    });
  }


  rechazarNotificacion(notificacion:Notificacion){

    Swal.fire({
      title: '¿Está seguro que desea rechazar el proyecto?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Rechazar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{           
        console.log(resp);
        this.cargarNotificaciones();
      });

    } 

    });   
  }


  
}



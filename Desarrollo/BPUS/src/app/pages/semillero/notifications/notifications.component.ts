import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'semillero-notifications',
  templateUrl: './notifications.component.html',
  styles: []
})
export class NotificationsComponent implements OnInit {

  botonArchivo = true;
  aprobado = false;
  enProceso = false;
  revision = false;

  seleccionarArchivo: File = null;

  constructor(private http: HttpClient){}

  elArchivoSeleccionado(event){
    this.seleccionarArchivo = <File>event.target.files[0]; 
  }

  subir(){
    const fd = new FormData();
    fd.append('image', this.seleccionarArchivo, this.seleccionarArchivo.name);
    this.http.post('http://localhost:4000/api/algo', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe( event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log('Subida en Progreso:' + Math.round(event.loaded / event.total * 100) + '%');
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  
    this.revision = true;
    this.botonArchivo = false;

  }

  ngOnInit() {
  }
}


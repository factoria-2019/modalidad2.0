import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {
  hospital:Hospital;
  token:string;
  constructor(
    public http: HttpClient,
     public router:Router,
     public _subirArchivoService:SubirArchivoService,
    public _usuarioService:UsuarioService )
      { 
        //console.log('Servicio de hospital listo.');
        this.token= _usuarioService.token;

      }


  cargarHospitales(desde:number=0){
    let url=URL_SERVICIOS+'/hospital?desde='+desde;
    return this.http.get(url)
            .map((resp:any)=>{
              return resp;
            });

  }
 


  obtenerHospital( id: string ){

    let url = URL_SERVICIOS+'/hospital/'+id;

    return this.http.get(url).map((resp:any) => resp.hospital);
  }

  borrarHospital( id: string ){
   // console.log('Este es el token'+this.token);
    let url=URL_SERVICIOS+'/hospital/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Hospital borrado','El hospital ha sido eliminado correctamente','success');
              return true;
        });
  }

  crearHospital( nombre: string ){
    let url=URL_SERVICIOS+'/hospital?token='+this.token;
    
    console.log(nombre);
   

    return this.http.post(url, {nombre})
    .map((resp:any)=>{
      swal.fire('El hospital ha sido creado',nombre,'success');
      return resp.hospital;

    });

  }

  buscarHospital( termino: string ){
    let url=URL_SERVICIOS+'/busqueda/coleccion/hospitales/'+termino;
    return this.http.get(url).map((resp:any)=>resp.hospitales);
  }

  actualizarHospital( hospital: Hospital ){
   
    // console.log(usuario._id);
    let url = URL_SERVICIOS+'/hospital/'+hospital._id+'?token='+this.token;
    
   // console.log(url);

    return this.http.put(url,hospital)
                    .map((resp:any)=>{

                     
                        let hospitalDB:Hospital=resp.usuario;
                        
                    
                           
                        swal.fire('Hospital actualizado',hospital.nombre,'success');

                      return true;
                    });
  }


 

}

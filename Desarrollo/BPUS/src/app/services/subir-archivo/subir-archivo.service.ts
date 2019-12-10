import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }


  subirArcivo(archivo:File,tipo:string,id:string){

    return new Promise(  (resolve,reject) =>{
        let formData=new FormData(); //JavaScript puro.
        let xhr=new XMLHttpRequest();
    
    
        formData.append('imagen',archivo,archivo.name);
    
        xhr.onreadystatechange = function(){
    
          if (xhr.readyState===4) {
            
              if (xhr.status===200) {
                console.log('Imagen subio!!!');
                resolve(JSON.parse(xhr.response));
              }else{

                console.log('Fallo la carga de la imagen!!!');
                resolve(xhr.response);
              }
            
          }
    
    
        };


        let url = URL_SERVICIOS+'/upload/'+tipo+'/'+id;
        
        xhr.open('PUT',url,true);
        xhr.send(formData);

    });


 



  }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  desde: number=0;
  usuarios: Usuario[]=[];
  cargando:boolean=true;
  constructor(  public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  buscarObjeto( termino:string){
    console.log("cargando: "+this.cargando);
    this.cargando=true;
    if(termino.length<=0){
        this.cargarUsuarios();
        return;
    }

    
    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios:Usuario[])=>{
      this.usuarios=usuarios;
      this.cargando=false;
});

  }

  
  cargarUsuarios(){
      this.cargando=true;
      this._usuarioService.cargarUsuarios(this.desde)
              .subscribe( usuarios => this.usuarios=usuarios );
              this.cargando=false;


  }

 
}


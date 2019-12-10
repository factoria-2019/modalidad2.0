import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit  {
  usuario:Usuario;
  iniciarSesion:Boolean;

  constructor(public _usuarioService:UsuarioService) {
    this.usuario=this._usuarioService.usuario;
    
   }

  ngOnInit() {
    
  }
  
  sesionLogo(){
  
    return this._usuarioService.estaLogueado();
    
  }

}

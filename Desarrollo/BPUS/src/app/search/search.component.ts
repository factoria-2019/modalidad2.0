import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
export class SearchComponent implements OnInit {
  usuario:Usuario;
  constructor(public _usuarioService:UsuarioService) { 

    this.usuario=this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  sesionLogo(){
  
    return this._usuarioService.estaLogueado();
    
  }
}

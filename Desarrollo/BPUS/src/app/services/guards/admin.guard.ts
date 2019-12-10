import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(

  public _usuarioService:UsuarioService,
 

  ){}
  canActivate(){
    if (this._usuarioService.usuario.role==='ADMIN_ROLE') {
      return true;  
    } else {
      //console.log('BLOQUEADERO POR EL GUARD');
      this._usuarioService.logout();
      
      return false;
    }

  }
}

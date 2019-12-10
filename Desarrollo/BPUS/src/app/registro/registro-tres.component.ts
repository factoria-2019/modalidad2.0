import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';// Librearia de alertas visuales.
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
@Component({
  selector: 'app-registro-tres',
  templateUrl: './registro-tres.component.html'
})
export class RegistroTresComponent implements OnInit {
  forma: any;
  constructor(private formBuilder: FormBuilder, private router: Router,public _usuarioService:UsuarioService) {      
    this.forma = this.formBuilder.group({
      nombres: [
      '',
      [Validators.required]
    ],
    apellidos: [
      '',
      [Validators.required]
    ],
    telefono: [
      '',
      [Validators.required, Validators.pattern("([0-9]){10}")]
    ],
    sedeUniversitaria: [
      'Neiva',
      Validators.required,
    ],
    facultad: [
      'Ingeniería',
      Validators.required,
    ],
    programaUniversitario: [
      'Ingeniería de software',
      Validators.required,
    ],
    genero: [
      'Femenino',
      Validators.required
    ]
  });
}

  get nombres() {
    return this.forma.get('nombres');
  }

  get apellidos() {
    return this.forma.get('apellidos');
  }

  get telefono() {
    return this.forma.get('telefono');
  }

  get sedeUniversitaria() {
    return this.forma.get('sedeUniversitaria');
  }

  get facultad() {
    return this.forma.get('facultad');
  }

  get programaUniversitario() {
    return this.forma.get('programaUniversitario');
  }

  get genero() {
    return this.forma.get('genero');
  }


  ngOnInit() {
  }

  registrarUsuario(){

    if (this.forma.invalid) {
      return;
    }

    let usuario = new Usuario( this.forma.value.nombres,
        this.forma.value.apellidos,
         localStorage.getItem("password"),
          localStorage.getItem("email")+"@usco.edu.co",
           this.forma.value.telefono,
            localStorage.getItem("tipoUsuario"),
            localStorage.getItem("tipoID"),
            localStorage.getItem("numDocumento"),
            this.forma.value.genero,
              localStorage.getItem("codigoUniversitario"),
                this.forma.value.sedeUniversitaria,
                 this.forma.value.facultad,
                  this.forma.value.programaUniversitario);
 
  this._usuarioService.crearUsuario(usuario)
  .subscribe(resp=>this.router.navigate(['/login']));
  this._usuarioService.removerRegistroStorage();
  }
}

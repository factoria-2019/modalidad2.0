import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  forma: any;
  constructor(private formBuilder: FormBuilder, private router: Router,public _usuarioService: UsuarioService ) {
    this.forma = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern('[^@]([A-Za-z0-9._]+){1,25}')]
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}')]
      ],
      passwordComprobar: [
        '',
        [Validators.required]
      ]
    }, { validators: passwordMatchValidator });
    console.log(this.forma);
  }

  get email() {
    return this.forma.get('email');
  }

  get password() {
    return this.forma.get('password');
  }

  get passwordComprobar() {
    return this.forma.get('passwordComprobar');
  }

  somethingChanged() {
    if (this.password.invalid && (this.password.dirty || this.password.touched)) {
      const patternWrong = document.getElementById('patternWrong');
      const patternOkay = document.getElementById('patternOkay');
      if (this.password.errors.pattern && !this.password.errors.required) {
        patternWrong.setAttribute('class', '');
        patternOkay.setAttribute('class', 'd-none');
      } else if (this.password.errors.required) {
        patternOkay.setAttribute('class', '');
      }
    }
  }

  ngOnInit() {
  }

  nextRegistro() {


    /*if (this.forma.invalid) {
      return;
    }
   */
    let usuario = new Usuario(null,null, this.forma.value.password, this.forma.value.email, null,null, null, null, null, null, null, null, null, null, null, null);
    
    this.router.navigate(['/registro-dos']);
    this._usuarioService.paginadoRegistro1a2(usuario);
    
  }

  showpassword(inputId: string, iconId: string) {
    const passwordd = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (passwordd.getAttribute('type') === 'password') {
      passwordd.setAttribute('type', 'text');
      icon.setAttribute('class', 'far fa-eye');
    } else {
      passwordd.setAttribute('type', 'password');
      icon.setAttribute('class', 'far fa-eye-slash');
    }
  }
}

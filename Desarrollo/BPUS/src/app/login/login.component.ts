import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  recuerdame = false;

  loginForm: any;

  constructor(private formBuilder: FormBuilder,  public router: Router,
              public _usuarioService: UsuarioService) {
                this.loginForm = this.formBuilder.group({
                  numDocumento: [
                    '',
                    [Validators.required, Validators.pattern('([0-9]){8,10}')]
                  ],
                  password: [
                    '',
                    [Validators.required]
                  ]
                });
              }
              
  get numDocumento() {
    return this.loginForm.get('numDocumento');
  }

  get password() {
    return this.loginForm.get('password');
  }

   showpassword() {
    const password = document.getElementById('password');
    const icon = document.getElementById('showpass');
    if (password.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
      icon.setAttribute('class', 'far fa-eye');
    } else {
      password.setAttribute('type', 'password');
      icon.setAttribute('class', 'far fa-eye-slash');
    }
  }


  ngOnInit() {
  }


  ingresar(forma: FormGroup) {

    if (forma.invalid) {
      return;
    }

    // tslint:disable-next-line: max-line-length
    let usuario = new Usuario(null, null, forma.value.password, null, null, null, null, forma.value.numDocumento, null, null, null, null, null, null, null);
    this._usuarioService.login(usuario).subscribe(correcto => this.router.navigate(['/search']));
    // this.router.navigate(['/dashboard']);
  }

}

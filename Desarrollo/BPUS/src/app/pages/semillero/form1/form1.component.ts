import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'form-1',
  templateUrl: './form1.component.html',
  styles: []
})
export class Form1Component implements OnInit {
  isSubmitted = false;
  constructor(public fb:FormBuilder) { }
registrationForm= this.fb.group({




  NombrePrograma:['',[Validators.required]],
          GrupoInvestigacion:['',[Validators.required]],
          NombreSemillero:['',[Validators.required]]

})
onSubmit() {
  this.isSubmitted = true;
  if (!this.registrationForm.valid) {
    return false;
  } else {
    alert(JSON.stringify(this.registrationForm.value))
  }



}
  ngOnInit() {
  }

  programas = [
    { id: 0, name: 'Tecnologia en agrucultura' },
    { id: 1, name: 'Matematica aplicada' },
    { id: 2, name: 'Fisica aplicada' },
    { id: 4, name: 'Biologia aplicada' },
    { id: 5, name: 'Ciencia politica' },
    { id: 6, name: 'Derecho' },
    { id: 7, name: 'Antropologia' },
    { id: 8, name: 'Comunicacion social y periodismo' },
  ]

  gruposInvestigacion = [
    { id: 0, name: 'Grupo01' },
    { id: 1, name: 'Grupo02' },
    { id: 2, name: 'Grupo03' },
    { id: 4, name: 'Grupo04' },
    { id: 5, name: 'Grupo05' }
  ]

  semilleros = [
    { id: 0, name: 'Semillero01' },
    { id: 1, name: 'Semillero02' },
    { id: 2, name: 'Semillero03' },
    { id: 4, name: 'Semillero04' },
    { id: 5, name: 'Semillero05' }
  ]

}


import { FormBuilder, Validators,ReactiveFormsModule,FormArray } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'form2',
  templateUrl: './form2.component.html',
  styles: []
})
@NgModule({
  imports:[
    ReactiveFormsModule
  ],
})
export class Form2Component implements OnInit {
  isSubmitted = false;

constructor(public fb:FormBuilder, private router: Router) { }
registrationForm2 = this.fb.group({
 NombreTutor:['',[Validators.required]],
 Actividades:['',[Validators.required]]

})

onSubmit() {
  this.isSubmitted = true;
  if (!this.registrationForm2.valid) {
      console.log(this.registrationForm2.value);
    return false;

  } else {

    this.router.navigate(['/semillero/form3']);

  }



}
  ngOnInit() {
  }
  tutores = [
    { id: 0, name: 'Juan Castro' },
    { id: 1, name: 'Ferley Medina' },
    { id: 2, name: 'Jhon Jerson Robles' },
    { id: 4, name: 'Andres Anaya' },
    { id: 5, name: 'Fernando Rojas' },
    { id: 6, name: 'Eliecer Martinez' },
  ]
}


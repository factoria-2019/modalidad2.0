import { FormBuilder, Validators,ReactiveFormsModule,FormArray } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'form3',
  templateUrl: './form3.component.html',
  styles: []
})
@NgModule({
  imports:[
    ReactiveFormsModule
  ],
})
export class Form3Component implements OnInit {
  isSubmitted = false;

  constructor(public fb:FormBuilder, private router: Router) { }
  registrationForm3 = this.fb.group({
  NombreProyecto:['',[Validators.required]],
  ObjetivoGp:['',[Validators.required]]

  })
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm3.valid) {
        console.log(this.registrationForm3.value);
      return false;

    } else {

      this.router.navigate(['/semillero/form4']);

    }
  }
  ngOnInit() {
  }


}

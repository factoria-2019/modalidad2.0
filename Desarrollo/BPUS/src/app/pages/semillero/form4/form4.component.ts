import { FormBuilder, Validators,ReactiveFormsModule,FormArray } from '@angular/forms';
import { Component, OnInit, NgModule,ViewChild } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'form4',
  templateUrl: './form4.component.html',
  styles: []
})

@NgModule({
  imports:[
    ReactiveFormsModule
  ],
})
export class Form4Component implements OnInit {
  isSubmitted = false;

  constructor(public fb:FormBuilder, private router: Router) { }
  registrationForm4 = this.fb.group({
  ObjetivosEp:['',[Validators.required]],
  JustifiacionP:['',[Validators.required]]

  })
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm4.valid) {
        console.log(this.registrationForm4.value);

      return false;

    } else {



    }
  }

  ngOnInit() {
  }
}


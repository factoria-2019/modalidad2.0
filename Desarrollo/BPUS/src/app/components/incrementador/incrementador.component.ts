import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  constructor() { 


    console.log('Leyenda',this.leyenda);
  }

  @ViewChild('txtPorcentaje')txtPorcentaje:ElementRef;
 @Input('nombre') leyenda: string='Leyenda'; // Se puede renombrar el atributo del decorador input.

  @Input()porcentaje: number= 60;
  @Output() cambioValor: EventEmitter<number>= new EventEmitter();

  ngOnInit() {
    console.log('Leyenda',this.leyenda);
   
  }

  onChanges( newValue: number){
    
    //let elemHTML: any = document.getElementsByName('porcentaje')[0];
   // console.log(elemHTML.value);

    if(newValue>=100){
  this.porcentaje=100;
    }else if(newValue<=0){
      this.porcentaje=0;
    }else{
    this.porcentaje= newValue;
    }

   // elemHTML.value=this.porcentaje;

   this.txtPorcentaje.nativeElement.value=this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  
  }
 
  cambiarValor(valor){

    if((this.porcentaje <=0 && valor<0) || (this.porcentaje>=100 && valor>0)){
        return;
    }
      this.porcentaje = this.porcentaje+valor;
      this.cambioValor.emit(this.porcentaje);
  
      this.txtPorcentaje.nativeElement.focus();
    }

}

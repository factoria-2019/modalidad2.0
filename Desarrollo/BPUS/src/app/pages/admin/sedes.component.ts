import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { SedeService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-tabla-profesores',
  templateUrl: './sedes.component.html',
  styles: []
})
export class SedesComponent implements OnInit {
  desde: number=0;
  sedes: Sede[]=[];
  cargando:boolean=true;
  forma:any;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public _SedeService: SedeService) { 
    this.forma = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required]
      ],
      ciudad: [
        '',
        [Validators.required]
      ],
      direccion: [
        '',
        [Validators.required]
      ],
      email: [
        '',
        [Validators.required]
      ]
    });
  }

  get email() {
    return this.forma.get('email');
  }

  get nombre() {
    return this.forma.get('nombre');
  }

  get direccion() {
    return this.forma.get('direccion');
  }

  get ciudad() {
    return this.forma.get('ciudad');
  }

  openModal(agregarSede) {
    this.modalService.open(agregarSede);
  }

  ngOnInit() {

    this.cargarSedes();
  }


  
  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._SedeService.totalSedes) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarSedes();
  }


  cargarSedes(){
    this.cargando=true;
this._SedeService.cargarSedes(this.desde)
            .subscribe( sedes => this.sedes=sedes );
            this.cargando=false;
  }

  buscarSedes( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarSedes();
        return;
    }

    
    
      this._SedeService.buscarSedes(termino)
                            .subscribe((sedes:Sede[])=>{
                              this.sedes=sedes;
                              this.cargando=false;
      });

  

  }

  borrarSedes(sede:Sede){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+sede.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._SedeService.borrarSedes(sede._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarSedes();


                    });
    } 
    });

    

  }

  addSede() {
    const sede = new Sede( this.forma.value.nombre,
      this.forma.value.ciudad,
      this.forma.value.direccion,
      this.forma.value.email);

    this._SedeService.crearSede(sede).subscribe(resp=> {
      this.cargarSedes();
      });
  }

  editarSede(sede: Sede) {
    swal.fire({
      title: 'Editar Sede',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE:</label>' +
      '<input type="text" id="sedeNombre" value="'+sede.nombre+'" placeholder="'+sede.nombre+'" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CIUDAD:</label>' +
      '<input type="text" id="sedeCiudad" value="'+sede.ciudad+'" placeholder="'+sede.ciudad+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">DIRECCIÓN:</label>' +
      '<input type="text" id="sedeDireccion" value="'+sede.direccion+'" placeholder="'+sede.direccion+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CORREO:</label>' +
      '<input type="email" id="sedeEmail" value="'+sede.email+'" placeholder="'+sede.email+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        sede.nombre = (document.getElementById('sedeNombre') as HTMLInputElement).value;
        sede.ciudad = (document.getElementById('sedeCiudad') as HTMLInputElement).value;
        sede.direccion = (document.getElementById('sedeDireccion') as HTMLInputElement).value;
        sede.email = (document.getElementById('sedeEmail') as HTMLInputElement).value;

        this._SedeService.actualizarSede(sede).subscribe(resp => {
        console.log(resp);
        this.cargarSedes();
        });
      }
    });
  }

}

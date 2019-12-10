import { Component, OnInit } from '@angular/core';
import { Facultad } from 'src/app/models/facultad.model';
import { FacultadService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-tabla-profesores',
  templateUrl: './Facultad.component.html',
  styles: []
})
export class FacultadComponent implements OnInit {
  desde: number=0;
  facultades: Facultad[]=[];
  cargando:boolean=true;
  forma: any;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public _facultadService: FacultadService) { 
    this.forma = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required]
      ],
      telefono: [
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

  get telefono() {
    return this.forma.get('telefono');
  }

  ngOnInit() {

    this.cargarFacultades();
  }

  openModal(agregarFacultad) {
    this.modalService.open(agregarFacultad);
  }
  
  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._facultadService.totalFacultades) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarFacultades();
  }


  cargarFacultades(){
    this.cargando=true;
this._facultadService.cargarFacultades(this.desde)
            .subscribe( facultades => this.facultades=facultades );
            this.cargando=false;
  }

  buscarFacultades( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarFacultades();
        return;
    }

    
    
      this._facultadService.buscarFacultades(termino)
                            .subscribe((facultades:Facultad[])=>{
                              this.facultades=facultades;
                              this.cargando=false;
      });

  

  }

  borrarFacultades(facultad:Facultad){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+facultad.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._facultadService.borrarFacultades(facultad._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarFacultades();


                    });
    } 
    });

    

  }

  crearFacultad() {
    const facultad = new Facultad(this.forma.value.nombre,this.forma.value.telefono,this.forma.value.email);
    this._facultadService.crearFacultad(facultad).subscribe(resp => {
    console.log(resp);
    this.cargarFacultades();
    });
  }

  editarFacultad(facultad: Facultad) {
    swal.fire({
      title: 'Crear Facultad',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE:</label>' +
      '<input type="text" id="facultadNombre" value="' + facultad.nombre + '" placeholder="' + facultad.nombre + '" ' +
      'class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">teléfono:</label>' +
      '<input type="text" id="facultadTelefono" value="' + facultad.telefono + '" placeholder="' + facultad.telefono + '" ' +
      'class="uscoInputs form-control" maxlength="11" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CORREO:</label>' +
      '<input type="text" id="facultadEmail" value="' + facultad.email + '" placeholder="' + facultad.email + '" ' +
      'class="uscoInputs form-control" maxlength="50" required>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        facultad.nombre = (document.getElementById('facultadNombre') as HTMLInputElement).value;
        facultad.telefono = (document.getElementById('facultadTelefono') as HTMLInputElement).value;
        facultad.email = (document.getElementById('facultadEmail') as HTMLInputElement).value;

        this._facultadService.actualizarFacultad(facultad).subscribe(resp => {
        console.log(resp);
        this.cargarFacultades();
        });
      }
    });
  }

}

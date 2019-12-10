import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//ProyectosUsco
import { NgxDropzoneModule } from 'ngx-dropzone';

// docentes
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';


import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionComponent } from './informacion/informacion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

//CrudAdmin
import { AdminComponent } from './admin/admin.component';
import { TablaTodosComponent } from './admin/tabla-todos.component';
import { NgbdModalContent } from './admin/tabla-todos.component';
import { ProgramasAcademicosComponent } from './admin/programas-academicos.component';
import { SedesComponent } from './admin/sedes.component';
import { FacultadComponent } from './admin/Facultad.component';

// Proyectos Usco
import { SolicitudComponent } from './proyectosUsco/solicitud/solicitud.component';
import { AnteproyectoComponent } from './proyectosUsco/anteproyecto/anteproyecto.component';
import { ProyectoComponent } from './proyectosUsco/proyecto/proyecto.component';
import { ArticuloComponent } from './proyectosUsco/articulo/articulo.component';
import { ProgresoComponent } from './proyectosUsco/progreso/progreso.component';

//Semillero
import {WelcomeComponent} from './semillero/welcome/welcome.component'
import {SemilleroUscoComponent} from './semillero/semillero-usco.component'
import {Form1Component} from './semillero/form1/form1.component'
import {Form2Component} from './semillero/form2/form2.component'
import {Form3Component} from './semillero/form3/form3.component'
import {Form4Component} from './semillero/form4/form4.component'
import {NotificationsComponent} from './semillero/notifications/notifications.component'


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
   
    DocenteComponent,
    DocenteDosComponent,
    DocenteTresComponent,
    ProfileComponent,
    InformacionComponent,
    NotificacionesComponent,
    //CrudAdmin
    AdminComponent,
    TablaTodosComponent,
    NgbdModalContent,
    ProgramasAcademicosComponent,
    SedesComponent,
    FacultadComponent,
    // Proyectos Usco
    SolicitudComponent,
    AnteproyectoComponent,
    ProyectoComponent,
    ArticuloComponent,
    ProgresoComponent,
    //Semillero
    SemilleroUscoComponent,
    WelcomeComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    Form4Component,
    NotificationsComponent

  ],
  entryComponents: [
    NgbdModalContent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule
  ]
})
export class PagesModule { }

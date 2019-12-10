import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styles: []
})
export class ProgresoComponent implements OnInit {
  today = new Date();
  jstoday = '';
  constructor() {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '-0500');
  }
  ngOnInit() {
  }
}

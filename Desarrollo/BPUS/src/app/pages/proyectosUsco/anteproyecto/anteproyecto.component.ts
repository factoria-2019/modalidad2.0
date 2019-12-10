import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.component.html',
  styleUrls: ['/../proyectosUsco.component.scss']
})
export class AnteproyectoComponent implements OnInit {
  today = new Date();
  jstoday = '';
  constructor() {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
  }

  onFilesAdded(files: File[]) {
    console.log(files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        // this content string could be used directly as an image source
        // or be uploaded to a webserver via HTTP request.
        console.log(content);
      };
      // use this for basic text files like .txt or .csv
      reader.readAsText(file);
      // use this for images
      // reader.readAsDataURL(file);
    });
  }
  onFilesRejected(files: File[]) {
    console.log(files);
  }

  ngOnInit() {
  }
}

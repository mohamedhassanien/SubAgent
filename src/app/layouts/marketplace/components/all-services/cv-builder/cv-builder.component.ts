import { Resume } from './models/cv';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-builder',
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.scss'],
})
export class CvBuilderComponent {
  formModel: {} = {};
  formData(e: object) {
    this.formModel = e;
    console.log(this.formModel);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.scss'],
})
export class CvViewComponent {
  @Input() formModel: any ;
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-how-to-start',
  templateUrl: './how-to-start.component.html',
  styleUrls: ['./how-to-start.component.scss'],
})
export class HowToStartComponent implements OnInit {
  fullName: string;
  constructor(private _ActivatedRoute: ActivatedRoute) {
    this.fullName = String(localStorage.getItem('name'));
  }

  ngOnInit(): void {
    window.scrollTo(0, 390);
  }
}

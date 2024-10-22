import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  // Animation
  loadingOptions: AnimationOptions = {
    path: '/assets/images/spinner/spinner.json',
  };
  constructor() {}

  ngOnInit(): void {}
}

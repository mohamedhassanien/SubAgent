import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-language-test',
  templateUrl: './language-test.component.html',
  styleUrls: ['./language-test.component.scss']
})
export class LanguageTestComponent implements OnInit {
  // Options for Animations
  duolingo: AnimationOptions = {
    path: '/assets/images/navigator/application/lang/duolingo.json',
  };

  constructor() { }

  ngOnInit(): void {
  }

}

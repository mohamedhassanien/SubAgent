import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatorService } from 'src/app/shared/services/translate/translate.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private translator: TranslatorService
  ) {}

  ngOnInit(): void {
    this.translator.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
  }
}

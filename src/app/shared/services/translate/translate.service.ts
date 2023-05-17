import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  localEvent = new Subject<string>();
  constructor(private translate: TranslateService) {}

  changeLocale(locale: string) {
    this.translate.use(locale);
    this.localEvent.next(locale);
    this.localEvent.next(String(localStorage.setItem('lang', locale)));
  }
}

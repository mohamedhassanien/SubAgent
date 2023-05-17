import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  differentSectionFlag: boolean = false;
  constructor() {}
}

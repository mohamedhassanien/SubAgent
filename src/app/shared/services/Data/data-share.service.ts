import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  view !: boolean
  constructor() { }
  // student's profile as the UI, apprears only in setting and dashboard componants
  // if view variable == true that's mean show (<div class="student-profile"></div>) in landing componant 
  // set view equal to true only in setting and dashboard componants otherwise set equal to false
  changeValue(value: boolean){
    this.view = value
  }
}

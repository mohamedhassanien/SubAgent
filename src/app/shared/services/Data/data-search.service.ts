import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// this search service
// used to enable the user search in program componant from any other componant
export class DataSearchService {
  // Indicates the name of the program we need to search for
  private messageName = new BehaviorSubject('None');
  currentMessageName = this.messageName.asObservable();
  
  // Indicates the Category of the program we need to search for
  private messageCategory = new BehaviorSubject('None');
  currentMessageCategory = this.messageCategory.asObservable();
  
  constructor() { }

  // search by name
  changeName(name: string) {
    this.messageName.next(name)
  }
  // search by category
  changeCategory(category: string) {
    this.messageCategory.next(category)
  }
}

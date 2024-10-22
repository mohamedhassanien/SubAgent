import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // For changing photo in header
  @Output() public profilePictureChanged: EventEmitter<any> =
    new EventEmitter();

  // For changing name in sub-agent dashboard
  @Output() public nameChanged: EventEmitter<any> = new EventEmitter();

  @Output() public progressChanged: EventEmitter<any> = new EventEmitter();

  @Output() public wishlistLength: EventEmitter<any> = new EventEmitter();

  constructor() {}
}

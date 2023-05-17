import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  username: string = '';

  constructor(private _Router: Router) {}
  // navigate to student dashboard only if the user is student
  canActivate() {
    if (localStorage.getItem('isLoggedIn')) {
      if (
        localStorage.getItem('type') === 'student' ||
        localStorage.getItem('type') === 'tech'
      )
        return true;
      else {
        localStorage.clear();
        this._Router.navigate(['/auth/login']);
        return false;
      }
    } else {
      localStorage.clear();
      this._Router.navigate(['/auth/login']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AgentGuard implements CanActivate {
  constructor(private _Router: Router) {}
  canActivate() {
    if (localStorage.getItem('isLoggedIn')) {
      if (
        localStorage.getItem('type') === 'agent' ||
        localStorage.getItem('type') === 'tech' ||
        localStorage.getItem('type') === 'owner' ||
        localStorage.getItem('type') === 'sub-agent' ||
        localStorage.getItem('type') === 'sub-agent-emp'
      )
        return true;
      else {
        alert('You are not allowed to access this page.');
        localStorage.clear();
        this._Router.navigate(['/auth/login']);
        return false;
      }
    } else {
      alert('You are not allowed to access this page.');
      localStorage.clear();
      this._Router.navigate(['/auth/login']);
      return false;
    }
  }
}

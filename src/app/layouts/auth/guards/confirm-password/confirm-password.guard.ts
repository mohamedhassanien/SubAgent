import { map } from 'rxjs/operators';
import { RegisterService } from './../../services/registeration/register.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfirmPasswordGuard implements CanActivate {
  constructor(private registerServ : RegisterService, private router : Router){}

  canActivate( route: ActivatedRouteSnapshot ) : Observable<boolean>{
    let token = route.params['token'];
    // active the guard if and only if the API return true
    // the API return true if the token was right
    // token (that send to the user by email after "change password" request )
    return this.registerServ.verifyUser(token)
    .pipe(map(
      (res) => {
        if (res) {
          return true
        }
        else {
          // if the token is wrong navigate to 404 module 
          this.router.navigate(['/404'])
          return false
        }
      }
    ));
  }
}

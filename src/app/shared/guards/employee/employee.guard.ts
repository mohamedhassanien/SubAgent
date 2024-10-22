import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from '../../services/Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(
    private _Router: Router,
    public _authService: AuthService,
  ) {}
  emp: boolean = false;
  async canActivate() {
    if (localStorage.getItem('isLoggedIn')) {
      await this.checktoken().
        then((data: any) => {
          const {code, message} = data;
          if(code === 202){
            console.log('eeeeeeeee')
            this.emp =true;
            console.log("iffff"+this.emp)
            return true;
          }
          else{
            alert('You are not allowed to access this page.');
            localStorage.clear();
            this._Router.navigate(['/auth/login']);
            this.emp = false;
            console.log("elseeee"+this.emp)
            return  false;
          }
        });
        console.log("ottt"+this.emp)
        return this.emp
      // if (
      //   localStorage.getItem('type') === 'employee' ||
      //   localStorage.getItem('type') === 'tech' ||
      //   localStorage.getItem('type') === 'owner'
      // ){
      //   // var emp;
      //   const token = localStorage.getItem('token');
      //   const email = localStorage.getItem('userEmail');
      //   this.checktoken().
      //   then((data: any) => {
      //     const {code, message} = data;
      //     if(code === 202){
      //       console.log('eeeeeeeee')
      //       this.emp =true;
      //       console.log("iffff"+this.emp)
      //       return true;
      //     }
      //     else{
      //       alert('You are not allowed to access this page.');
      //       localStorage.clear();
      //       this._Router.navigate(['/auth/login']);
      //       this.emp = false;
      //       console.log("elseeee"+this.emp)
      //       return  false;
      //     }
      //   });
      //   console.log("ottt"+this.emp)
      //   return this.emp;
      // }
        
      // else {
      //   alert('You are not allowed to access this page.');
      //   localStorage.clear();
      //   this._Router.navigate(['/auth/login']);
      //   return false;
      // }
    } else {
      alert('You are not allowed to access this page.');
      localStorage.clear();
      this._Router.navigate(['/auth/login']);
      return false;
    }
  }

  checktoken():  Promise<Object> {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    return this._authService.checkToken(token, email).toPromise();
  }
}

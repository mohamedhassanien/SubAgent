import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentAuthService {
  studentLoggedIn !: boolean ;
  employeeLoggedIn !: boolean ;
  
  constructor(private httpservice: HttpClient) {}

  isLogin(email : any, password: any){
    // pass user's email and password
    // login API return true or false
    return this.httpservice.post(environment.APIURL + `login/1?email=${email}&password=${password}`,  httpOptions)
  }
}

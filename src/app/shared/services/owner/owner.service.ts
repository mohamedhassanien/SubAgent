import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  // to get all statistics of employees
  getAllEmployeesStats(){
    return this.http.post(environment.APIURL + `owner/statistics`, httpOptions);
  }
  // get employee statistics
  getSingleEmployeeStats(month:number, year:number){
    return this.http.post(environment.APIURL + `owner/searchmonthly?month=${month}&year=${year}`, httpOptions);
  }
}

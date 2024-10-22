import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Program } from '../../models/program';


import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private http: HttpClient) { }

  // To post aaplied programs
  postAppliedProgram(name: any, email: any, id: any, cv: any, cr: any) {
    return this.http.post(
      environment.APIURL +
      `app_website?username=${name}&studentemail=${email}&progid=${id}&cv=${cv}&certificates=${cr}`,
      httpOptions
    );
  }

  // To get all Programs without filtering
  getAllPrograms() {
    return this.http.post(
      environment.APIURL +
      `filter/1?name=None&city=None&Language=None&type=None&level=None&sort=None&school=None&category=None`,
      httpOptions
    );
  }
  getAllProgramsSearchName() {
    return this.http.post(
      environment.APIURL +
      `filter/1?name=None&city=None&Language=None&type=None&level=None&sort=None&school=None&category=None`,
      httpOptions
    ).pipe(
      map((response:any) => response.map(item => item['progName']))
    );
  }
  getSchoolName() {
    return this.http.get(
      environment.APIURL +
      `employee/allSchools`,
      httpOptions
    )
  }
  

  // Get all cities in case of header filter
  getCities() {
    return this.http.post(environment.APIURL + `cities`, httpOptions);
  }

  // To get all Programs with filtering
  getAllFilteredPrograms(
    name: any,
    city: string,
    language: string,
    type: string,
    level: string,
    sort: string,
    school: string,
    category: string
  ) {
    return this.http.post(
      environment.APIURL +
      `filter/1?name=${name}&city=${city}&Language=${language}&type=${type}&level=${level}&sort=${sort}&school=${school}&category=${category}`,
      httpOptions
    );
  }

  // To wishlist a program in DB
  wishlistProgram(id: number, studentName: string) {
    return this.http.post(
      environment.APIURL +
      `student/savedprogram?student=${studentName}&program=${id}`,
      httpOptions
    );
  }

  // To remove a program form wishlist
  removeWishlistedProgram(id: number, studentName: string) {
    return this.http.post(
      environment.APIURL +
      `student/remove/wishlist?student=${studentName}&program=${id}`,
      httpOptions
    );
  }

  // To get all wishlisted programs for a student
  getWishlistedPrograms(studentName: string) {
    return this.http.post(
      environment.APIURL + `student/getsavedprograms?student=${studentName}`,
      httpOptions
    );
  }
  getAllCities(){
    return this.http.get(environment.APIURL + `cities_dashboard`,httpOptions);
  }

  // To check if there's an offer or not
  getUpdates() {
    return this.http.get(environment.APIURL + `newupdates`, httpOptions);
  }

  // To get a single program Info
  getSingleProgramInfo(id: number) {
    return this.http.get<Program>(
      environment.APIURL + `proginfo2?progId=${id}`,
      // environment.APIURL + `program/details?progId=${id}`,
      httpOptions
    );
  }

  // get all programs without filter in program componant
  // with search bar in any other componant we pass the name of the program to search with
  // pass the category of the program only in home page in (<div class="section-container courses>)
  getPrograms(name: string = 'None', category: string = 'None') {
    return this.http.post<any[]>(
      environment.APIURL +
      `filter/1?name=${name}&city=None&Language=None&type=${category}&level=None&sort=None&school=None`,
      httpOptions
    );
  }

  // TO get applied programs
  getAppliedPrograms(userName) {
    return this.http.post(
      environment.APIURL + `student/applied/programs?username=${userName}`,
      httpOptions
    );
  }

  // TO get suggested programs
  getSuggestedPrograms(userName: string) {
    console.log(userName);
    const user = {
      "studentusername": userName
    };
    console.log(user);
    return this.http.get(
      environment.APIURL + `suggestprograms?data=${JSON.stringify(user)}`,
      httpOptions
    );
  }


  addSuggestedPrograms(programs: any,
    username: string) {
    const program = {
      "choice": 1,
      "studentusername": username,
      "suggested_programID": programs.suggested_programID
    };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: program,
    };
    return this.http.put(
      environment.APIURL + `suggestprograms`,
      program,
      httpOptions
    );
  }
}

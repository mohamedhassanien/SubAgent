import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Program } from '../models/program';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private http: HttpClient) {}

  // To post aaplied programs
  postAppliedProgram(name: any, email: any, id: any, cv: any, cr: any) {
    return this.http.post(
      environment.APIURL +
        `app_website?username=${name}&studentemail=${email}&progid=${id}&cv=${cv}&certificates=${cr}`,
      httpOptions
    );
  }

  // To post GalileoData
  postGalileoData(GalileoData: any) {
    return this.http.post(
      environment.APIURL + `GalileoApp?obj=${GalileoData}`,
      httpOptions
    );
  }

  // To post FigsData
  postFigsData(FigsoData: any) {
    // return this.http.post(environment.APIURL +
    //   `GalileoApp?obj=${FigsoData}`,
    //   httpOptions
    // );
  }

  // To get all Programs without filtering
  getAllPrograms() {
    return this.http.post(
      environment.APIURL +
        `filter/1?name=None&city=None&Language=None&type=None&level=None&sort=None&school=None&category=None`,
      // `filter2/1?name=None&city=None&Language=None&type=None&level=None&sort=None&school=None&category=None`,
      httpOptions
    );
  }

  // To get all programs Categories
  getCategories() {
    return this.http.post(environment.APIURL + `getcategories`, httpOptions);
  }

  // Get all cities in case of header filter
  getCities() {
    return this.http.post(environment.APIURL + `cities`, httpOptions);
  }

  // Get all schools in case of header filter
  getSchools() {
    return this.http.post(environment.APIURL + `schools`, httpOptions);
  }

  // To get all Programs with filtering
  getAllFilteredPrograms(
    name: string,
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

  getFilteredPrograms(
    name: string,
    city: string,
    language: string,
    filterType: string,
    level: string,
    sort: string
  ) {
    return this.http.post(
      environment.APIURL +
        `filter/1?name=${name}&city=${city}&Language=${language}&type=${filterType}&level=${level}&sort=${sort}&school=None`,
      httpOptions
    );
  }

  // get all the program's information
  progranInfo(id: number) {
    return this.http.post(
      environment.APIURL + `programs/1?id=${id}`,
      httpOptions
    );
  }

  // to get program info
  progranInfoNew(id: number) {
    return this.http.get(
      environment.APIURL + `program/details?progId=${id}`,
      httpOptions
    );
  }

  // apply the student to a program
  applyProgram(progName: any, schoolName: any, city: any, email: any) {
    return this.http.post(
      environment.APIURL +
        `apply/1?progname=${progName}&schoolname=${schoolName}&email=${email}&city=${city}`,
      httpOptions
    );
  }
  // check if the student is already applied to this program before or not
  checkApplied(email: string, id: number) {
    return this.http.post(
      environment.APIURL + `checkapply/${id}/${email}`,
      httpOptions
    );
  }

  // To Edit Program Details
  EditProg(
    programName: string,
    lang: string,
    type: string,
    cityName: string,
    progLevel: number,
    length: number,
    fee: number,
    intake: any,
    school: string,
    id: number
  ) {
    return this.http.post(
      environment.APIURL +
        `edit?Name=${programName}&Language=${lang}&type=${type}&city=${cityName}&level=${progLevel}&length=${length}&fee=${fee}&intake=${intake}&school=${school}&id=${id}`,
      httpOptions
    );
  }

  // showing Programs on lg screens
  showProgramsOnLg(category: String) {
    this.http
      .post(
        `https://admin-mfyg726r7q-uc.a.run.app/filter/1?name=None&city=None&Language=None&type=${category}&level=None&sort=1`,
        httpOptions
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}

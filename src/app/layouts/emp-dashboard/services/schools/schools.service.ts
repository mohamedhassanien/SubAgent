import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SchoolsService {
  email: String = String(localStorage.getItem('userEmail'));

  constructor(private http: HttpClient) {}

  getRelatedSchools(type: string) {
    return this.http.post(
      environment.APIURL +
        `schools/relatedSchools?schoolType=${type}&studentEmail=${this.email}`,
      httpOptions
    );
  }

  getHighestRatedProgs() {
    return this.http.get(
      environment.APIURL +
        `programs/highestRatedProgs?studentEmail=${this.email}`,
      httpOptions
    );
  }

  getAllSchools() {
    return this.http.post(environment.APIURL + `schools`, httpOptions);
  }

  getSchoolInfo() {
    return this.http.post(environment.APIURL + `schools/info`, httpOptions);
  }
}

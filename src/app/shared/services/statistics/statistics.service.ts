import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  // to get Top nations of users
  getTopNationsUsers() {
    return this.http.post(
      environment.APIURL + `top_nations_users?month=January&year=2023`,
      httpOptions
    );
  }

  // add target for employee
  addTargetForEmp(month: number, year: number, empid: string, target: number) {
    return this.http.post(
      environment.APIURL +
        `addtarget?month=${month}&year=${year}&empid=${empid}&target=${target}
      `,
      httpOptions
    );
  }

  // edit target for employee
  editTargetForEmp(month: number, year: number, empid: string, target: number) {
    return this.http.post(
      environment.APIURL +
        `EditTarget?month=${month}&year=${year}&empid=${empid}&target=${target}
        `,
      httpOptions
    );
  }

  // to get Top nations of schools
  getTopNationsSchool(month: string, year: number) {
    return this.http.post(
      environment.APIURL + `top_nation_schools?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get application sources
  getAppSources(month: string, year: number) {
    return this.http.post(
      environment.APIURL + `source-app?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get application stages
  getAppStages(month: string, year: number) {
    return this.http.post(
      environment.APIURL + `stages-app?month=${month}&year=${year}`,
      httpOptions
    );
  }
  // to get application schools
  getAppSchools(month: string, year: number) {
    return this.http.post(
      environment.APIURL + `school-app?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get top shools emps
  getTopSchoolsEmps(month: string, year: number) {
    return this.http.post(
      environment.APIURL + `top_Schools_emp?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get rejection per schools
  getRejectionPerSchool(month: string, year: number) {
    return this.http.post(
      environment.APIURL +
        `rejection_schools_nationalities?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get rejection per schools employee
  getRejectionPerSchoolEmp(month: string, year: number) {
    return this.http.post(
      environment.APIURL + `rejection_emp_school?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get rejection per schools employee
  getAppStageEmps(month: number, year: number) {
    return this.http.post(
      environment.APIURL + `getTarget?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get rejection per schools employee
  getLeadsGraph() {
    return this.http.post(
      environment.APIURL + `leads-graph?month=January&year=2023`,
      httpOptions
    );
  }
  // to get all employees stats in each country
  getCountryStats() {
    return this.http.post(
      environment.APIURL + `stats?month=January&year=2023`,
      httpOptions
    );
  }

  // to get all employees applications numbers
  getAllEmpsAppStats() {
    return this.http.post(
      environment.APIURL + `statsempapp?month=January&year=2023`,
      httpOptions
    );
  }

  // to get all country applications numbers
  getAllCountryAppStats() {
    return this.http.post(
      environment.APIURL + `statscountryapp?month=January&year=2023`,
      httpOptions
    );
  }

  // to get all applications employees stats
  getAllEmpStats() {
    return this.http.post(
      environment.APIURL + `statsempstat?month=January&year=2023`,
      httpOptions
    );
  }

  // to get all sub-agent statistics
  getAllSubEgentStats(email: string, name: string) {
    return this.http.post(
      `https://admin-mfyg726r7q-uc.a.run.app/subagent/subAgentStatistics?subAgentEmail=${email}&subAgentUserName=${name}`,
      httpOptions
    );
  }
}

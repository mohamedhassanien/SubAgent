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
  username = String(localStorage.getItem('userName'));
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
        `target?month=${month}&year=${year}&empid=${empid}&target=${target}
      `,
      httpOptions
    );
  }

  // edit target for employee
  editTargetForEmp(month: number, year: number, empid: string, target: number) {
    return this.http.put(
      environment.APIURL +
        `target?month=${month}&year=${year}&empid=${empid}&target=${target}
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

  // to get prospect status
  getProspectstatus(month: string, year: string,empid: string ) {
    return this.http.get(
      environment.APIURL + `statics/status-prospect?empid=${empid}&month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get application reminder
  getReminderStatus(
    month: string,
    year: number,
    status: string,
    representative: string
  ) {
    return this.http.post(
      environment.APIURL +
        `graph_reminder_stats?month=${month}&year=${year}&status=${status}&representative=${representative}`,
      httpOptions
    );
  }

  getAppPerEmp(month: string, year: number, representative: string) {
    return this.http.get(
      environment.APIURL +
        `graph-app-status-emp?intake_year=${year}&intake_month=${month}&empid=${representative}`,
      httpOptions
    );
  }

  getProspectStatus(month: string, year: number, representative: string) {
    return this.http.post(
      environment.APIURL +
        `graph_prospect_stats?representative=${representative}&month=${month}&year=${year}`,
      httpOptions
    );
  }

  getSchoolPerEmp(month: string, year: number, representative: string) {
    return this.http.get(
      environment.APIURL +
        `graph-top-school-emp?intake_year=${year}&intake_month=${month}&empid=${representative}`,
      httpOptions
    );
  }

  getMonthlyAppPerEmp(month: number, year: number) {
    return this.http.get(
      environment.APIURL + `target?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get application stages
  getAppStages(month: string, year: string, empid:string) {
    return this.http.get(
      environment.APIURL + `statics/status-app?empid=${empid}&month=${month}&year=${year}`,
      httpOptions
    );
  }
  // to get application schools
  getAppSchools(month: string, year: string) {
    return this.http.post(
      environment.APIURL + `school-app?month=${month}&year=${year}`,
      httpOptions
    );
  }

  // to get top application schools

  getTopAppSchools(month: string, year: string, empid:string){
    return this.http.get(
      environment.APIURL + `app/school-type?empid=${empid}&month=${month}&year=${year}`,
      httpOptions
    );
  }

  // get to previous school in prospect
  getTopPreSchoolProspect(month: string, year: string, empid:string){
    return this.http.get(
      environment.APIURL + `prospect/prschool-type?empid=${empid}&month=${month}&year=${year}`,
      httpOptions
    );
  }

  // get previous school in application
  getTopPreSchoolApp(month: string, year: string, empid:string){
    return this.http.get(
      environment.APIURL + `app/prschool-type?empid=${empid}&month=${month} &year=${year}`,
      httpOptions
    );
  }
  
  // get conversion rate
  getConversionRate(month: string, year: string, empid:string){
    return this.http.get(
      environment.APIURL + `Conversion-rate/status?empid=${empid}&month=${month}&year=${year}`,
      httpOptions
    );
  }

  // get previous school from current school in prospect
  getPreSchoolProspect(month: string, year: string, schoolname:string){
    return this.http.get(
      environment.APIURL + `school/prschool-prospect?school=${schoolname}&year=${year}&month=${month}`,
      httpOptions
    );
  }

  // get previous school from current school in prospect
  getPreSchoolApplication(month: string, year: string, schoolname:string){
    return this.http.get(
      environment.APIURL + `school/prschool-app?school=${schoolname}&year=${year}&month=${month}`,
      httpOptions
    );
  }

  // to get application depositpaid
  getAppDeposit(month: number, year: string, employee: string) {
    return this.http.post(
      environment.APIURL +
        `/AppsToDepositPaid?month=${month}&year=${year}&emp=${this.username}`,
      httpOptions
    );
  }
  topProgramsInApplicationsApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `app/program-type?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }
  topProgramsInProspectApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `prospect/program-type?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }
  topSchoolInApplicationsApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `prospect/school-type?month=${month}&year=${year}&empid=${employee}`,
      httpOptions
    );
  }
  topSchoolInProspectApi(month: number, year: number, employee: string) {
    return this.http.get(
      environment.APIURL +
        `prospect/app/school-type?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }
  topPreviousSchoolInApplicationApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `prospect/prschool-type?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }
  topPreviousInProspectApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `app/prschool-type?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }
  topStatusInApplicationsApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `statics/status-prospect?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }
  topStatusInProspectsApi(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `statics/status-app?month=${month}&year=${year}&empid=${this.username}`,
      httpOptions
    );
  }

  // to get application converted
  getAppConverted(month: number, year: string, employee: string) {
    return this.http.get(
      environment.APIURL +
        `/convertedleadstoapps?month=${month}&year=${year}&emp=${this.username}`,
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

  // target emplwee
  gettarget(empid: string) {
    return this.http.post(
      environment.APIURL + `YourTarget?empid=${empid}`,
      httpOptions
    );
  }

  // delete target
  deletetarget(month: number, year: number, empid: string) {
    return this.http.delete(
      environment.APIURL + `target?month=${month}&year=${year}&empid=${empid}`,
      httpOptions
    );
  }

  // add target
  addarget(month: string, year: string, empid: string, target: any, targetTeam: number) {
    // return this.http.post(
    //   environment.APIURL +
    //     `target?month=${month}&year=${year}&empid=${empid}&target=${target}`,
    //   httpOptions
    // );
    return this.http.post(
      environment.APIURL +
        `target?month=${month}&year=${year}&empid=${empid}&target=${target}&type=${targetTeam.toString()}`,
      httpOptions
    );
  }


  // get apllication radar data
getAppRadar(month: string, year: string, empid:string){
  return this.http.get(
    environment.APIURL + `app-radar?empid=${empid}&month=${month}&year=${year}`,
    httpOptions
  );
}

// get source application
getSourceApplication(month: string, year: string, empid:string){
  return this.http.get(
    environment.APIURL + `source-app?month=${month}&year=${year}&empid=${empid}`,
    httpOptions
  );
}
}

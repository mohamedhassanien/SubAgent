import { Prospect } from './../../models/prospect';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Student } from '../../models/student';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  filterData = new Subject<any>();
  // employee service ==> all employee APIs
  // Each function expresses its job
  email: string = String(localStorage.getItem('EmpEmail'));
  empEmail: string = String(localStorage.getItem('userEmail'));
  empUsername: string = String(localStorage.getItem('userName'));
  empid: string = String(localStorage.getItem('userName'));
  dateyear: number = new Date().getFullYear();

  employee!: any;
  constructor(private http: HttpClient) { }

  getAllEmployeesStudentsJanthisyear() {
    return this.http.get<Student[]>(
      environment.APIURL + `prospects/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername
      }&month=September&year=${this.dateyear - 1}`,
      httpOptions
    );
  }
  getEmployeesNotification() {
    return this.http.get<Student[]>(
      environment.APIURL + `prospects/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername
      }&month=September&year=${this.dateyear - 1}`,
      httpOptions
    );
  }

  getAllEmployeesStudentsJthisyear() {
    return this.http.get<Student[]>(
      environment.APIURL + `prospects/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername}&month=January&year=${this.dateyear}`,
      httpOptions
    );
  }

  // getAllEmployeesStudents() {
  //   return this.http.get<Student[]>(
  //     environment.APIURL + `no-employee/students?empEmail=${this.empEmail}&empUserName=${this.empUsername
  //     }&archive=${0}`,
  //     httpOptions
  //   );
  // }

  // Get all archived leads
  getArchivedLeads() {
    return this.http.get(
      environment.APIURL + `no-employee/students?empEmail=${this.empEmail}&empUserName=${this.empUsername
      }&archive=${1}`,
      httpOptions
    );
  }

  getAllEmployeesStudentsSepthisyear() {
    return this.http.get<Student[]>(
      environment.APIURL + `prospects/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername}&month=September&year=${this.dateyear}`,
      httpOptions
    );
  }
  getAllEmployeesStudentsJannextyear() {
    return this.http.get<Student[]>(
      environment.APIURL + `prospects/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername
      }&month=January&year=${this.dateyear - 1}`,
      httpOptions
    );
  }

  getAllEmployeesStudentsCount() {
    return this.http.post(environment.APIURL + `/count`, httpOptions);
  }

  getAllProspect() {
    return this.http.get<Prospect[]>(
      environment.APIURL + `leads/intake?representative=${this.empid}&leadtype=4&year=null&month=null&archive=0`,
      httpOptions
    );
  }
  getAllProspectGrid() {
    return this.http.get<Prospect[]>(
      environment.APIURL + `prospects/intake?empUserName=${this.empid}&empEmail=${this.empEmail}&type=0&year=null&month=null`,
      httpOptions
    );
  }
  getAllApplications() {
    return this.http.get(
      environment.APIURL + `allapps/intake?empName=${this.empid}&type=0&year=null&month=null`,
      httpOptions
    );
  }

  sendToProspect(studentUserName, status) {
    return this.http.put<Prospect[]>(
      environment.APIURL + `employee/editstudentstatus?empid=${this.empid}&studentUserName=${studentUserName}&status=${status}`,
      httpOptions
    );
  }
  sendToApplicationApp(studentUserName, status) {
    return this.http.put<Prospect[]>(
      environment.APIURL + `employee/editstudentstatus?empid=${this.empid}&studentUserName=${studentUserName}&status=${status}`,
      httpOptions
    );
  }
  applicationStatus(studentUserName, status) {
    return this.http.put(
      environment.APIURL + `applications/status?empid=${this.empid}&studentUserName=${studentUserName}&status=${status}`,
      httpOptions
    );
  }
  prospectStatus(studentUserName, status) {
    return this.http.put(
      environment.APIURL + `employee/editprospectstatus?empid=${this.empid}&studentUserName=${studentUserName}&status=${status}`,
      httpOptions
    );
  }

  //get all schools data
  getAllSchoolsData() {
    return this.http.get(
      environment.APIURL + `allschoolsdashboard`,
      httpOptions
    );
  }
  //add New School data
  // addNewSchoolData(formData: any) {
  //   return this.http.post(environment.APIURL + `data-school`, httpOptions, formData)
  // }

  addNewSchoolData(formData: any) {
    return this.http.post(
      environment.APIURL + `data-school`, formData, httpOptions);
  }

  //get all programs data
  getAllProgramsData() {
    return this.http.get(environment.APIURL + `programs?name=null`, httpOptions);
  }

  //get all registered leads
  getAllRegisteredLeads() {
    return this.http.post<Prospect[]>(
      environment.APIURL + `get/accounts/created?empEmail=${this.empEmail}&empUserName=${this.empUsername}`,
      httpOptions
    );
  }


  addNewLead(
    studentFirstName: any,
    studentLastName: any,
    studentEmail: any,
    studentPhone: any,
    studnetSchoolInterest: any,
    studnetProgInterest: any,
    studentNationality: any,
    studentCountryOfResidence: any,
    serious: any,
    empid: any,
    intakeYear: any,
    intakeMonth: any,
    foi: any,
    fututrelead: any,
    budget: any,
    password: any,
    iswebsite: any,
    source: any,
    language_study: any,
    eng_test_name: any,
    eng_test_score: any,
    fr_test_name: any,
    fr_test_score: any,
    commentContent: any,
    entry_level: any
  ) {
    return this.http.post(
      environment.APIURL + `leads?studentFirstName=${studentFirstName}&studentLastName=${studentLastName}&studentEmail=${studentEmail}&studentPhone=${studentPhone}&studnetSchoolInterest=${studnetSchoolInterest}&studnetProgInterest=${studnetProgInterest}&studentNationality=${studentNationality}&serious=${serious}&empid=${empid}&intakeYear=${intakeYear}&intakeMonth=${intakeMonth}&foi=${foi}&fututrelead=${fututrelead}&budget=${budget}&password=${password}&iswebsite=${iswebsite}&source=${source}&language_study=${language_study}&eng_test_name=${eng_test_name}&eng_test_score=${eng_test_score}&fr_test_name=${fr_test_name}&fr_test_score=${fr_test_score}&commentContent=${commentContent}&level=${entry_level}&countryofresidence=${studentCountryOfResidence}`,
      httpOptions
    );
  }
  editStudentLead(
    studentusername: any,
    studentFirstName: any,
    studentLastName: any,
    studentEmail: any,
    studentPhone: any,
    studnetSchoolInterest: any,
    studnetProgInterest: any,
    studentNationality: any,
    studentCountryOfResidence: any,
    serious: any,
    empid: any,
    intakeYear: any,
    intakeMonth: any,
    foi: any,
    fututrelead: any,
    budget: any,
    source: any,
    language_study: any,
    eng_test_name: any,
    eng_test_score: any,
    fr_test_name: any,
    fr_test_score: any,
    entry_level: any,
    prvschool: any
  ) {
    return this.http.put(
      environment.APIURL + `student/view?studentusername=${studentusername}&studentFirstName=${studentFirstName}&studentLastName=${studentLastName}&studentEmail=${studentEmail}&studentPhone=${studentPhone}&studnetSchoolInterest=${studnetSchoolInterest}&studnetProgInterest=${studnetProgInterest}&studentNationality=${studentNationality}&studentCountryOfResidence=${studentCountryOfResidence}&serious=${serious}&empid=${empid}&intakeYear=${intakeYear}&intakeMonth=${intakeMonth}&foi=${foi}&fututrelead=${fututrelead}&budget=${budget}&source=${source}&language_study=${language_study}&eng_test_name=${eng_test_name}&eng_test_score=${eng_test_score}&fr_test_name=${fr_test_name}&fr_test_score=${fr_test_score}&level=${entry_level}&prvschool=${prvschool}`,
      httpOptions
    );
  }

  // add school
  addSchool(school) {
    // const school = {
    //   "name": name,
    //   "descr": '-',
    //   "descr_fr": '-',
    //   "alumni": '-',
    //   "efmd": '-',
    //   "ranking": ranking,
    //   "aacsb": '-',
    //   "amba": '-',
    //   "equis": '-',
    //   "field": '-',
    //   "country": country,
    //   "emba": '-',
    //   "gmaps": '-',
    //   "youtube": '-',
    //   "coverpics": logo,
    //   "logopics": cover
    // }
    return this.http.post(
      environment.APIURL + `allschoolsdashboard`,
      school,
      httpOptions
    );
  }

  // edit school
  editSchool(
    name: string,
    country: string,
    ranking: string,
    pics: string,
    school
  ) {
    return this.http.post(
      environment.APIURL +
      `editschooldashboard?id=${school.id}&name=${name}&descr=${school.descr
      }&descr_fr=${school.descr_fr}&alumni=${school.alumni}&efmd=${school.EFMD
      }&ranking=${ranking}&aacsb=${school.aacsb}&amba=${school.amba}&equis=${school.equis
      }&field=${school.field.replace(/&/g, 'and')}&country=${country}&emba=${school.emba
      }&gmaps=${school.gmaps}&youtube=${school.youtube}&pics=${pics}`,
      httpOptions
    );
  }

  // To get a specific employee students
  getEmployeeStudents() {
    return this.http.get(
      environment.APIURL + `prospect/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername
      }&month=September&year=${this.dateyear - 1}`,
      httpOptions
    );
  }

  getEmployeeStudentstotal() {
    return this.http.get(
      environment.APIURL + `employee/students?empEmail=${this.empEmail}&empUserName=${this.empUsername}`,
      httpOptions
    );
  }

  getEmployeeStudentssepthis() {
    return this.http.get(
      environment.APIURL + `prospect/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername}&month=September&year=${this.dateyear}`,
      httpOptions
    );
  }

  getEmployeeStudentsjannext() {
    return this.http.get(
      environment.APIURL + `prospect/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername
      }&month=January&year=${this.dateyear - 1}`,
      httpOptions
    );
  }
  getEmployeeStudentsjnnext() {
    return this.http.get(
      environment.APIURL + `prospect/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername}&month=January&year=${this.dateyear}`,
      httpOptions
    );
  }

  // Assign leads for employees
  assignLeads(studentUserName: string, empUserName: string) {
    return this.http.post(
      environment.APIURL + `employee/assign/emp/lead?userNameStudent=${studentUserName}&empUserName=${empUserName}`,
      httpOptions
    );
  }

  // Assign leads for prospect
  assignProspects(studentUserName: string) {
    return this.http.put(
      environment.APIURL + `assign/pro/emp?username=${studentUserName}&EmpId=${this.empUsername}`,
      httpOptions
    );
  }

  // To archive a lead
  archiveLead(studentEmail: string) {
    return this.http.post(
      environment.APIURL + `employee/archive/lead?empName=${this.empUsername}&studentEmail=${studentEmail}`,
      httpOptions
    );
  }

  // To archive a lead
  unarchiveLead(studentEmail: string) {
    return this.http.post(
      environment.APIURL + `restore/student/archive?empName=${this.empUsername}&studentEmail=${studentEmail}`,
      httpOptions
    );
  }

  // To archive an application
  archiveApplication(studentEmail: string) {
    return this.http.post(
      environment.APIURL + `employee/archive/app?studentEmail=${studentEmail}&empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To archive a lead
  unarchiveApplication(studentEmail: string) {
    return this.http.post(
      environment.APIURL + `restore/application/archive?empName=${this.empUsername}&studentEmail=${studentEmail}`,
      httpOptions
    );
  }

  getProspectNotifications(empName: string, empEmail: string, studenUsername: string) {

    return this.http.get<Student[]>(
      environment.APIURL + `prospect/notification?empUserName=${empName}&empEmail=${empEmail}&studentusername=${studenUsername}`,
      httpOptions
    );
  }

  // To get latest notifications
  getNotifications() {
    return this.http.get(
      environment.APIURL + `employee/get/getnotifications?empid=${this.empUsername}`,
      httpOptions
    );
  }

  // check notification
  checkNoti(id: number) {
    return this.http.post(
      environment.APIURL + `employee/check/notification?id=${id}`,
      httpOptions
    );
  }

  // get suggested program
  getSuggestedProgram(username: string, empusername?) {
    const data = JSON.stringify({
      "studentusername": username,
      "empid": empusername
    });
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: data,
    };
    return this.http.get(
      environment.APIURL + `suggestprograms?data=${data}`,
      httpOptions
    );
  }

  // add suggested program
  addSuggestedProgram(username: string, object: string) {
    console.log(object);
    return this.http.post(
      environment.APIURL + `/suggestProgram?username=${username}&object=${object}`,
      httpOptions
    );
  }
  addSuggestedPrograms(program) {
    return this.http.post(environment.APIURL + `suggestprograms`, program, httpOptions);
  }

  //EDIT SUGGESTED PROGRAM
  editSuggestedProgram(program) {

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

  //DELETE SUGGESTED PROGRAM
  deleteSuggestedProgram(program) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: program,
    };
    return this.http.delete(
      environment.APIURL + `suggestprograms`,
      options
    );
  }


  // To get all programs names
  getProgramsNames() {
    return this.http.get(
      environment.APIURL + `employee/allPrograms`,
      httpOptions
    );
  }

  // To get all schools name
  getSchoolsNames() {
    return this.http.get(
      environment.APIURL + `employee/allSchools`,
      httpOptions
    );
  }

  // To add a lead
  addLead(
    fullName: string,
    email: string,
    empId: string,
    phone: string,
    school: string,
    program: string,
    country: string,
    score: string,
    source: string,
    month: string,
    year: string
  ) {
    return this.http.post(
      environment.APIURL +
      `empadd?studentFullName=${fullName}&studentEmail=${email}&empid=${empId}&studentPhone=${phone}&studnetSchoolInterest=${school}&studnetProgInterest=${program}&studentNationality=${country}&serious=${score}&source=${source}&intakeYear=${year}&intakeMonth=${month}`,
      httpOptions
    );
  }

  // To edit a student
  editStudent(
email: string, userName: string, phone: string, nationality: string, school: string, program: string, source: string, score: string, status: string, month: string, year: string, previousSchool?: string, employeeName?: string, firstname?: string, lastname?: string  ) {
    return this.http.post(
      environment.APIURL +
      `employee/editstudentinfo?empid=${employeeName}&studentEmail=${email}&studentUserName=${userName}&studentPhone=${phone}&studentNationality=${nationality}&studnetSchoolInterest=${school}&studnetProgInterest=${program}&source=${JSON.stringify(source)}&serious=${score}&status=${status}&intakeYear=${year}&intakeMonth=${month}&requested=${this.empUsername}&Prschool=${previousSchool}&studentFirstName=${firstname}&studentLastName=${lastname}`,
      httpOptions
    );
  }

  // To edit a lead
  editLead(
    fullName: string,
    email: string,
    interest: string,
    phone: string,
    score: string,
    status: string,
    nationality: string,
    username: string
  ) {
    // foi=${encodeURIComponent(interest)}
    console.log('service', fullName, email, interest, phone, score);
    return this.http.put(
      environment.APIURL +
      `leads?username=${username}&name=${fullName}&status=${status}&phone=${phone}&score=${score}&foi=${interest}&empid=${this.empid}&nationality=${nationality}`,
      httpOptions
    );
  }

  // To edit application
  editApplication(
    studentName: string,
    studentEmail: string,
    studentUserName: string,
    phone: string,
    nationality: string,
    school: string,
    program: string,
    source: string,
    score: number,
    status: string,
    campus: string,
    month: string,
    year: string,
    schoolFee: number,
    previousSchool: string,
    id: number
  ) {
    return this.http.put(
      environment.APIURL +
      `applications?empid=${this.empUsername}&studentFullName=${studentName}&studentEmail=${studentEmail}&studentUserName=${studentUserName}&studentPhone=${phone}&studentNationality=${nationality}&studnetSchoolName=${school}&studnetProgName=${program}&source=${JSON.stringify(source)}&serious=${score}&status=${status}&schoolCampus=${campus}&studnetIntakeMonth=${month}&studnetIntakeYear=${year}&schoolFee=${schoolFee}&IDapp=${id}&Prschool=${previousSchool}`,
      httpOptions
    );
  }

  // To edit secondary application
  editSecondaryApplication(
    studentName: string,
    studentEmail: string,
    studentUserName: string,
    phone: string,
    nationality: string,
    school: string,
    program: string,
    source: string,
    score: number,
    status: string,
    campus: string,
    month: string,
    year: string,
    schoolFee: number,
    id: number
  ) {
    return this.http.post(
      environment.APIURL +
      `empEditAppSecondary?empid=${this.empUsername}&studentFullName=${studentName}&studentEmail=${studentEmail}&studentUserName=${studentUserName}&studentPhone=${phone}&studentNationality=${nationality}&studnetSchoolName=${school}&studnetProgName=${program}&source=${source}&serious=${score}&status=${status}&schoolCampus=${campus}&studnetIntakeMonth=${month}&studnetIntakeYear=${year}&schoolFee=${schoolFee}&IDapp=${id}`,
      httpOptions
    );
  }


  editSecondaryApp(
    studentUserName: string,
    school: string,
    program: string,
    status: string,
    campus: string,
    id: number
  ) {
    return this.http.put(
      environment.APIURL +
      `empEditAppSecondary?empid=${this.empUsername}&studentUserName=${studentUserName}&studnetSchoolName=${school}&studnetProgName=${program}&status=${status}&schoolCampus=${campus}&IDapp=${id}`,
      httpOptions
    );
  }

  deleteSecondaryApp(id) {
    return this.http.delete(
      environment.APIURL + `secondary-apps?appid=${id.toString()}&empid=${this.empid}`,
      httpOptions
    );
  }

  getSecondaryPrograms(username: string) {
    return this.http.get(
      environment.APIURL +
      `secondary-apps?username=${username}&empname=${this.empUsername}`
    );

  }


  // to add new employee
  addEmployee(name: string, email: string) {
    return this.http.post(
      environment.APIURL + `employee?name=${name}&email=${email}`,
      httpOptions
    );
  }

  addNewEmployee(name: string, email: string, job: string, number: string, password: string) {
    return this.http.post(
      environment.APIURL + `employee?name=${name}&email=${email}&password=${password}&jobtitle=${job}&phone=${number}`,
      httpOptions
    );
  }

  // to get all employees
  getAllEmployees() {
    return this.http.get(
      environment.APIURL + `representative-names`,
      httpOptions
    );
  }
  getAllTargets(month, year, emptype: number) {
    return this.http.get(
      environment.APIURL + `target?month=${month}&year=${year}&type=${emptype}&targettype=${emptype}`,
      httpOptions
    );
  }
  getTheTargets(month, year, emptype: number) {
    return this.http.get(
      environment.APIURL + `target?month=${month}&year=${year}&type=${emptype}&targettype=${emptype}`,
      httpOptions
    );
  }
  MorningMail() {
    return this.http.post(environment.APIURL + `morning/mail`, httpOptions);
  }
  EmployeeEmail(username: string, email: string) {
    return this.http.post(
      environment.APIURL + `/notistudents?username=${username}&email=${email}`,
      httpOptions
    );
  }
  ProspectNotification(username: string) {
    return this.http.get(
      environment.APIURL + `/prospectnotifications?username=${username}`,
      httpOptions
    );
  }


  // To restore application to lead
  restoreApplication(userName: string) {
    return this.http.post(
      environment.APIURL +
      `employee/retrive/application?empid=${this.empUsername}&studentUserName=${userName}`,
      httpOptions
    );
  }

  // Soft delete lead
  softDeleteLead(userName: string) {
    return this.http.post(
      environment.APIURL +
      `employee/delete/student?studentUserName=${userName}&empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To get deleted leads
  getDeletedLeads() {
    return this.http.post(
      environment.APIURL +
      `employee/get/soft_deleted/leads?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To restore deleted leads
  restoreDeletedLeads(studentEmail: string) {
    return this.http.post(
      environment.APIURL +
      `employee/restore/soft_deleted/leads?empName=${this.empUsername}&studentEmail=${studentEmail}`,
      httpOptions
    );
  }

  // Soft delete application
  softDeleteApplication(appid: number) {
    return this.http.delete(
      environment.APIURL + `applications?appid=${appid}`,
      httpOptions
    );
  }

  // add new application
  addNewApplication(
    email: string,
    name: string,
    school: string,
    program: string,
    empUserName: string,
    month: string,
    year: string
  ) {
    return this.http.post(
      environment.APIURL +
      `applications?email=${email}&name=${name}&school=${school}&program=${program}&empid=${empUserName}&month=${month}&year=${year}
      `,
      httpOptions
    );
  }

  // To get deleted leads
  getDeletedApplications() {
    return this.http.post(
      environment.APIURL +
      `employee/get/application/soft_deleted?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To restore deleted application
  restoreDeletedApplications(appId: number) {
    return this.http.post(
      environment.APIURL + `restore/student/soft_delete?appid=${appId}`,
      httpOptions
    );
  }

  // to restore prospect to lead
  restoreToProspect(userName: string, empid: any) {
    return this.http.post(
      environment.APIURL + `employee/revert/prospect?username=${userName}&empid=${empid}`,
      httpOptions
    );
  }

  // to send prospect to leads
  sendProspectToLeads(userName: string) {
    // return this.http.post(
    //   environment.APIURL + `/prosLead?username=${userName}`,
    //   httpOptions
    // );
    return this.http.post(
      environment.APIURL +
      `employee/assign/emp/lead?userNameStudent=${userName}&empUserName=${this.empid}`,
      httpOptions
    );
  }

  // to send prospect to leads
  sendRegistered(studentUserName: string, empid: string) {
    return this.http.post(
      environment.APIURL +
      `newaccounttoprospect?studentUserName=${studentUserName}&empid=${empid}`,
      httpOptions
    );
  }

  // to restore application to leads
  restoreToLeads(userName: string) {
    return this.http.post(
      environment.APIURL +
      `employee/retrive/application?empid=${this.empUsername}&studentUserName=${userName}`,
      httpOptions
    );
  }

  // To change status only
  changeStatus(status: string, userName: string, type: string) {
    return this.http.post(
      environment.APIURL +
      `employee/student/update/status?status=${status}&studentUserName=${userName}&empName=${this.empUsername}&identifier=${type}`,
      httpOptions
    );
  }

  // To get comments
  getAllComments() {
    return this.http.get(
      environment.APIURL + `comments?empName=${this.empUsername}`,
      httpOptions
    );
  }

  getStudentComments(email: string) {
    return this.http.get(
      environment.APIURL + `comments?studentemail=${email}&empname=${this.empUsername}`,
      httpOptions
    );
  }

  // To add a new Comment
  addNewComment(email: string, comment: string) {
    return this.http.post(
      environment.APIURL +
      `comments?empName=${this.empUsername}&studentEmail=${email}&commentContent=${comment}`,
      httpOptions
    );
  }

  // To delete an old comments
  deleteOldComment(id: number) {
    return this.http.delete(
      environment.APIURL +
      `comments?commentId=${id}&empName=${this.empUsername}`,
      httpOptions
    );
  }

  // to edit old comments
  editOldComment(email: string, comment: string, id: number) {
    return this.http.put(
      environment.APIURL +
      `comments?empName=${this.empUsername}&studentEmail=${email}&updatedCommentContent=${comment}&commentId=${id}`,
      httpOptions
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////////


  // Get all archived applications

  getSiteApps() {
    return this.http.get(
      environment.APIURL + `get/app/website?empName=${this.empUsername}`,
      httpOptions
    );
  }

  getSchPrograms(sch: string) {
    return this.http.get(
      environment.APIURL + `programs/school?school=${sch}`,
      httpOptions
    );
  }
  getCampus() {
    return this.http.get(
      environment.APIURL + `/cities`,
      httpOptions
    );
  }

  // To get emps app
  getEmployeeApps() {
    return this.http.get(
      environment.APIURL +
      `apps/intake?empName=${this.empUsername}&month=September&year=${this.dateyear - 1
      }`,
      httpOptions
    );
  }
  getEmployeeAppsj() {
    return this.http.get(
      environment.APIURL +
      `apps/intake?empName=${this.empUsername}&month=January&year=${this.dateyear}`,
      httpOptions
    );
  }

  getEmployeeAppstotal() {
    return this.http.get(
      environment.APIURL + `applications?empName=${this.empUsername}`,
      httpOptions
    );
  }
  getEmployeeAppsjantwo() {
    return this.http.get(
      environment.APIURL +
      `apps/intake?empName=${this.empUsername}&month=January&year=${this.dateyear - 1
      }`,
      httpOptions
    );
  }
  getEmployeeAppssep() {
    return this.http.get(
      environment.APIURL +
      `apps/intake?empName=${this.empUsername}&month=September&year=${this.dateyear}`,
      httpOptions
    );
  }

  // delete the student's program application by employee
  // by pass applicationID
  deleteApp(appId: string) {
    return this.http.post(environment.APIURL + `delapp/${appId}`, httpOptions);
  }

  // To archive applications
  archiveSelectedApps(emails: string[], empId: string) {
    return this.http.put(
      environment.APIURL +
      `archive/applications?studentEmail=[${emails}]&empName=${empId}`,
      httpOptions
    );
  }

  // to get archived students
  getArchivedStudents(empId: string) {
    return this.http.post(
      environment.APIURL + `getarchivestudents?empid=${empId}`,
      httpOptions
    );
  }

  // to get deleted apps
  getDeletedApps(empId: string) {
    return this.http.post(
      environment.APIURL + `show/deleted/apps?empName=${empId}`,
      httpOptions
    );
  }

  // get all student in database
  getAllStudents() {
    return this.http.post(environment.APIURL + 'getallstudents', httpOptions);
  }

  // To pass inputs to registration form
  studentName: string = '';
  studentEmail: string = '';
  studentPhone: string = '';

  setInputs(name: string, email: string, phone: string) {
    this.studentName = name;
    this.studentEmail = email;
    this.studentPhone = phone;
  }

  getNameInput() {
    return this.studentName;
  }
  getEmailInput() {
    return this.studentEmail;
  }
  getPhoneInput() {
    return this.studentPhone;
  }

  resetInputs() {
    return (
      (this.studentName = ''),
      (this.studentEmail = ''),
      (this.studentPhone = '')
    );
  }

  // send Email to the student from employee
  sendEmail(message: string, studentemail: string, empolyee: string) {
    return this.http.post(
      environment.APIURL +
      `messageemail/${message}/${studentemail}/${empolyee}`,
      httpOptions
    );
  }

  // To get all students
  getAllSchools() {
    return this.http.get(environment.APIURL + 'allschoolsnames', httpOptions);
  }

  // To get programs of school for edit program
  getEditSchoolProgs(school: string) {
    return this.http.get(
      environment.APIURL + `programs/school?school=${school}`,
      httpOptions
    );
  }

  // To add program
  addProgram(
    name: string,
    type: string,
    city: string,
    level: string,
    fees: number,
    length: number,
    intake: string,
    lang: string,
    schName: string
  ) {
    return this.http.post(
      environment.APIURL +
      `programs?name=${name}&language=${lang}&type=${type.replace(
        /&/g,
        'and'
      )}&city=${city}&level=${level}&fee=${fees}&length=${length}&intake=${intake}&school=${schName}&spec=${'-'}`,
      httpOptions
    );
  }
  // To edit program
  editProgram(
    name: string,
    type: string,
    city: string,
    level: string,
    fees: number,
    length: number,
    intake: string,
    lang: string,
    schName: string,
    id: string
  ) {
    return this.http.post(
      environment.APIURL +
      `/editProgramDashboard?name=${name}&language=${lang}&type=${type.replace(
        /&/g,
        '%26'
      )}&city=${city}&level=${level}&fee=${fees}&length=${length}&intake=${intake}&school=${schName}&spec=${'-'}&id=${id}`,
      httpOptions
    );
  }

  // To edit program
  editProgramInfo(
    ID: number,
    name: string,
    type: string,
    city: string,
    level: string,
    fees: number
  ) {
    return this.http.post(
      environment.APIURL +
      `/edit/prog/school?progid=${ID}&progname=${name}&programtype=${type}&programcity=${city}&programlevel=${level}&programfee=${fees}
      `,
      httpOptions
    );
  }

  // to get all comments of a specific email
  getComments(email: string) {
    return this.http.post(
      environment.APIURL + `get_student_comment/${email}`,
      httpOptions
    );
  }

  // to get all programs of a specific school
  getSchoolPrograms(school: string) {
    return this.http.post(
      environment.APIURL + `AllProgramsPerSchoolDashboard?school=${school}`,
      httpOptions
    );
  }

  // to get secondary applications
  getSecondaryApp(username: string) {
    return this.http.get(
      environment.APIURL +
      `secondary-apps?username=${username}&empname=${this.empUsername}`,
      httpOptions
    );
  }

  // to add a new comment
  addComment(email: string, empName: string, comment: any) {
    return this.http.post(
      environment.APIURL + `comment_student/${empName}/${email}/${comment}`,
      httpOptions
    );
  }

  // Delete comment
  deleteComment(id: number) {
    return this.http.post(
      environment.APIURL + `delete/comment?id=${id}`,
      httpOptions
    );
  }

  // Create an secondary application
  createSecondaryApplication(
    username: string,
    email: string,
    school: string,
    program: string,
    city: string,
    status: string
  ) {
    return this.http.post(
      environment.APIURL +
      `secondary-apps?username=${username}&progname=${program}&schoolname=${school}&city=${city}&email=${email}&empid=${this.empUsername}&status=${status}`,
      httpOptions
    );
  }

  // Create an secondary application
  switchToSecondaryApplication(primary, secondary) {
    return this.http.post(
      environment.APIURL +
      `/switchPrimaryapp?app1=${secondary}&app2=${primary}`,
      httpOptions
    );
  }

  // To get all employees names
  getAllData() {
    return this.http.post(environment.APIURL + `getcardData`, httpOptions);
  }

  getCardData(month, year) {
    return this.http.get(environment.APIURL + `getcardData?month=${month}&year=${year}`, httpOptions);
  }

  // To get profile numbers
  getProfileNunmbers(userName: string) {
    return this.http.get(
      environment.APIURL + `profilenumber?empUsername=${userName}`,
      httpOptions
    );
  }

  // To delete emplyee
  deleteEmplyee(emplyeeName: string) {
    return this.http.delete(
      environment.APIURL + `/employee?empUsername=${emplyeeName}`,
      httpOptions
    );
  }
  theEmplyee() {
    return this.http.get(
      environment.APIURL + `employee?username=${this.empUsername}`,
      httpOptions
    );
  }
  filterAction(leadType, year, month, archive) {
    return this.http.get(
      environment.APIURL + `/leads/intake?representative=${this.empUsername}&leadtype=${leadType}&year=${year}&month=${month}&archive=${archive}`,
      httpOptions
    );
  }
  filterProspectAction(Type, year, month, archive, soft) {
    return this.http.get(
      environment.APIURL + `/prospects/intake?empEmail=${this.empEmail}&empUserName=${this.empUsername}&type=${Type}&year=${year}&month=${month}&archive=${archive}&soft=${soft}`,
      httpOptions
    );
  }
  archiveAction(Type, year, month, archive, soft) {
    return this.http.get(
      environment.APIURL + `/prospects/intake/archive?empEmail=${this.empEmail}&empUserName=${this.empUsername}&type=${Type}&year=${year}&month=${month}&archive=${archive}&soft=${soft}`,
      httpOptions
    );
  }
  filterApplicationAction(Type, year, month, secondary, archive, soft) {
    return this.http.get(
      environment.APIURL + `/allapps/intake?empName=${this.empUsername}&type=${Type}&year=${year}&month=${month}&secondary=${secondary.toString()}&archive=${archive.toString()}&soft=${soft}`,
      httpOptions
    );
  }

  getStudentData(studentName, type) {
    return this.http.get(
      environment.APIURL + `/student/view?representative=${this.empUsername}&studentusername=${studentName}&type=${type}`,
      httpOptions
    );
  }
  getStudentDocs(studentName) {
    return this.http.get(
      environment.APIURL + `/apps/documnet?empName=${this.empUsername}&studentusername=${studentName}`,
      httpOptions
    );
  }

  getAllEmployeeNames() {
    return this.http.get(
      environment.APIURL + `employee-dashboard?username=${this.empUsername}`,
      httpOptions
    );
  }


  getProgramsByName(name: string) {
    return this.http.get(
      environment.APIURL + `programs?name=${name}`,
      httpOptions
    );
  }

  getProspects(Type, year, month, empUserName, empEmail, archive, soft) {
    return this.http.get(
      environment.APIURL + `/prospects/intake?empEmail=${empEmail}&empUserName=${empUserName}&type=${Type}&year=${year}&month=${month}&archive=${archive}&soft=${soft}`,
      httpOptions
    );
  }
  getMsg(threadid, msg) {
    return this.http.get(
      `https://admin-mfyg726r7q-uc.a.run.app/gator?threadid=${threadid}&message=${msg}`,
      httpOptions
    );
  }
  getMsgChatBotPage(threadid, msg) {
    return this.http.post(
      `https://mohanad-gadallah-mfyg726r7q-uc.a.run.app/tuinsBot?threadid=${threadid}&message=${msg}`,
      httpOptions
    );
  }
  getMsgChatBotMoroccoPage(threadid, msg) {
    return this.http.post(
      `https://mohanad-gadallah-mfyg726r7q-uc.a.run.app/morrccobot?threadid=${threadid}&message=${msg}`,
      httpOptions
    );
  }

  // To delete employee
  deleteEmployee(empUsername) {
    return this.http.get(
      environment.APIURL + `/employee?delid=${empUsername}&username=${this.empUsername}`,
      httpOptions
    );
  }
  restoreAppProspect(Username) {
    return this.http.post(
      environment.APIURL + `/restore_app_prospect?username=${Username}&empid=${this.empUsername}`,
      httpOptions
    );
  }


  addArtical(link) {
    return this.http.post(
      environment.APIURL + `/article?link=${link}`,
      httpOptions
    );
  }

  deleteProspect(studentUsername) {
    var del = {
      "username": studentUsername,
      'empid': this.empUsername
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: del,
    };
    return this.http.delete(
      environment.APIURL + `/student/delete`,
      options
    );
  }

  editTarget(target, username, month, year, emptype) {
    var edit = {
      "month": month,
      "year": year,
      "empid": username,
      "target": target,
      "username": this.empUsername,
      "targettype": emptype
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: edit,
    };
    return this.http.put(
      environment.APIURL + `/targets`,
      edit,
      httpOptions
    );
  }

  deleteTarget(username, month, year, emptype) {
    var del = {
      "month": month,
      "year": year,
      "empid": username,
      "username": this.empUsername,
      "targettype": emptype
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: del,
    };
    return this.http.delete(
      environment.APIURL + `/targets`,
      options
    );
  }

  sendToPrimary(id, studentusername) {
    var app = {
      "studentusername": studentusername,
      "empid": this.empUsername,
      "appid": id
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: app,
    };
    return this.http.post(
      environment.APIURL + `/switchprimaryapp`,
      app,
      httpOptions
    );
  }
  addNewProgram(data) {
 
    return this.http.post(
      environment.APIURL + `/data-program`, data, httpOptions);
  }
  addNewSchool(data:any) {
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'getSchool':'False'
      }),
    };
    return this.http.post(environment.APIURL + `/data-school`, data, httpOptions2)
  }
  getAllCampus() {
    return this.http.get(environment.APIURL + `/cities_dashboard`, httpOptions)
  }
  getSchoolNames(){
    return this.http.get(environment.APIURL + `/data-school`,httpOptions)
  }

}

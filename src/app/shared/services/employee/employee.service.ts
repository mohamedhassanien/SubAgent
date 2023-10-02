import { Prospect } from './../../models/prospect';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Student } from '../../models/student';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // employee service ==> all employee APIs
  // Each function expresses its job
  email: string = String(localStorage.getItem('EmpEmail'));
  empEmail: string = String(localStorage.getItem('userEmail'));
  empUsername: string = String(localStorage.getItem('userName'));

  employee!: any;
  constructor(private http: HttpClient) {}

  getAllEmployeesStudents() {
    return this.http.post<Student[]>(
      environment.APIURL +
        `employee/get/all/leads?empEmail=${this.empEmail}&empUserName=${this.empUsername}`,
      httpOptions
    );
  }

  //get all prospect
  getAllProspect() {
    return this.http.post<Prospect[]>(
      environment.APIURL + `get/allpros`,
      httpOptions
    );
  }

  // add prospect
  addProspect(
    name: string,
    email: string,
    score: string,
    empName: string,
    phone: string,
    nation: string,
    foi: string
  ) {
    return this.http.post(
      environment.APIURL +
        `add/prospect?name=${name}&email=${email}&score=${score}&empid=${empName}&phone=${phone}&nation=${nation}&foi=${foi}`,
      httpOptions
    );
  }

  editProspect(
    username: string,
    name: string,
    email: string,
    foi: string,
    phone: string,
    score: string,
    nationality: string
  ) {
    return this.http.post(
      environment.APIURL +
        `/EditProspect?username=${username}&name=${name}&email=${email}&phone=${phone}&score=${score}&foi=${foi}&nationality=${nationality}`,
      httpOptions
    );
  }

  // To get a specific employee students
  getEmployeeStudents() {
    return this.http.post(
      environment.APIURL +
        `employee/students?empEmail=${this.empEmail}&empUserName=${this.empUsername}`,
      httpOptions
    );
  }

  // To get all sub-agents info
  getAllSubAgents() {
    return this.http.post(
      environment.APIURL +
        `employee/getAllSubAgents?empUserName=${this.empUsername}&empEmail=${this.empEmail}`,
      httpOptions
    );
  }

  // To get all sub agents applications info
  getSubAgentsApps() {
    return this.http.post(
      environment.APIURL +
        `employee/getAppsOfSubAgent?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To Delete a subagent
  deleteSubAgent(username: string, email: string) {
    return this.http.post(
      environment.APIURL +
        `employee/deleteSubAgent?empName=${this.empUsername}&empEmail=${this.empEmail}&subAgentUserName=${username}&subAgentEmail=${email}`,
      httpOptions
    );
  }

  // Assign leads for employees
  assignLeads(studentUserName: string, empUserName: string) {
    return this.http.post(
      environment.APIURL +
        `employee/assign/emp/lead?userNameStudent=${studentUserName}&empUserName=${empUserName}`,
      httpOptions
    );
  }

  // Assign leads for prospect
  assignProspects(studentUserName: string) {
    return this.http.post(
      environment.APIURL +
        `assign/pro/emp?username=${studentUserName}&EmpId=${this.empUsername}`,
      httpOptions
    );
  }

  // Get all archived leads
  getArchivedLeads() {
    return this.http.post(
      environment.APIURL +
        `employee/get/archived/leads?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To archive a lead
  archiveLead(studentEmail: string) {
    return this.http.post(
      environment.APIURL +
        `employee/archive/lead?empName=${this.empUsername}&studentEmail=${studentEmail}`,
      httpOptions
    );
  }

  // To archive a lead
  unarchiveLead(studentEmail: string) {
    return this.http.post(
      environment.APIURL +
        `restore/student/archive?empName=${this.empUsername}&studentEmail=[${studentEmail}]`,
      httpOptions
    );
  }

  // Get all archived leads
  getArchivedApplications() {
    return this.http.post(
      environment.APIURL +
        `employee/get/application/archived?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To archive a lead
  archiveApplication(studentEmail: string) {
    return this.http.post(
      environment.APIURL +
        `employee/archive/app?studentEmail=${studentEmail}&empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To archive a lead
  unarchiveApplication(studentEmail: string) {
    return this.http.post(
      environment.APIURL +
        `restore/application/archive?empName=${this.empUsername}&studentEmail=[${studentEmail}]`,
      httpOptions
    );
  }

  // get Employee's Applications

  // empId == emplopyeeID which we can get it by getID() fun.
  getMyApplication(empId: string): Observable<any> {
    return this.http.post(environment.APIURL + `appsemp/${empId}`, httpOptions);
  }

  // delete all applications
  deleteAllApps(email: String, empName: string) {
    return this.http.post(
      environment.APIURL + `delete_application?email=${email}&empid=${empName}`,
      httpOptions
    );
  }

  // return all employee's student
  // email == employee's email which stored in localstorage whitin login
  getMyStudents(email: string) {
    return this.http.post(
      environment.APIURL + `employeestudents?email=${email}`,
      httpOptions
    );
  }

  // To Edit employee's Student Info
  oldEditStudent(
    name: string,
    nat: string,
    email: string,
    phone: string,
    username: string,
    school: string,
    program: string
  ) {
    return this.http.post(
      environment.APIURL +
        `/editstudentinfo/${name}/${email}/${nat}/${phone}/${username}/${school}/${program}`,
      httpOptions
    );
  }

  editApp(
    name: string,
    nat: string,
    email: string,
    phone: string,
    username: string
  ) {
    return this.http.post(
      environment.APIURL +
        `/editstudentinfo/${name}/${email}/${nat}/${phone}/${username}`,
      httpOptions
    );
  }

  // To get latest notifications
  getNotifications() {
    return this.http.post(
      environment.APIURL +
        `employee/get/getnotifications?empid=${this.empUsername}`,
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
    fullName: string,
    email: string,
    userName: string,
    phone: string,
    nationality: string,
    school: string,
    program: string,
    source: string,
    score: string,
    status: string,
    month: string,
    year: string,
    vip?: string
  ) {
    return this.http.post(
      environment.APIURL +
        `employee/editstudentinfo?empid=${this.empUsername}&studentFullName=${fullName}&studentEmail=${email}&studentUserName=${userName}&studentPhone=${phone}&studentNationality=${nationality}&studnetSchoolInterest=${school}&studnetProgInterest=${program}&source=${source}&serious=${score}&status=${status}&intakeYear=${year}&intakeMonth=${month}&vip=${vip}`,
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
    vip?: string
  ) {
    return this.http.post(
      environment.APIURL +
        `employee/edit/app?empid=${this.empUsername}&studentFullName=${studentName}&studentEmail=${studentEmail}&studentUserName=${studentUserName}&studentPhone=${phone}&studentNationality=${nationality}&studnetSchoolName=${school}&studnetProgName=${program}&source=${source}&serious=${score}&status=${status}&schoolCampus=${campus}&studnetIntakeMonth=${month}&studnetIntakeYear=${year}&vip=${vip}`,
      httpOptions
    );
  }

  // to add new employee
  addEmployee(name: string, email: string) {
    return this.http.post(
      environment.APIURL + `addEmpDash?name=${name}&email=${email}`,
      httpOptions
    );
  }

  // to get all employees
  getAllEmployees() {
    return this.http.post(environment.APIURL + `GetEmpsDash`, httpOptions);
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
        `employee/restore/soft_deleted/leads?empName=${this.empUsername}&studentEmail=[${studentEmail}]`,
      httpOptions
    );
  }

  // Soft delete application
  softDeleteApplication(appid: number) {
    return this.http.post(
      environment.APIURL + `employee/app/deletepp?appid=${appid}`,
      httpOptions
    );
  }

  // add new program
  addNewProgram(
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
        `employee/add/newapp?email=${email}&name=${name}&school=${school}&program=${program}&empid=${empUserName}&month=${month}&year=${year}
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

  // to restore application to prospect
  restoreToProspect(userName: string) {
    return this.http.post(
      environment.APIURL + `employee/revert/prospect?username=${userName}`,
      httpOptions
    );
  }

  // get my prospect
  getMyProspect() {
    return this.http.post(
      environment.APIURL + `/get/employeepros?empid=${this.empUsername}`,
      httpOptions
    );
  }

  // to send prospect to leads
  sendProspectToLeads(userName: string) {
    return this.http.post(
      environment.APIURL + `/prosLead?username=${userName}`,
      httpOptions
    );
  }

  // to send prospect to leads
  checkType() {
    return this.http.post(
      environment.APIURL + `/checktype8?username=${this.empUsername}`,
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

  // To get statistics numbers
  getStatistics(type: string) {
    return this.http.post(
      environment.APIURL +
        `employee/getstatistics?identifier=${type}&empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To get comments
  getAllComments() {
    return this.http.post(
      environment.APIURL + `employee/get/comments?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To add a new Comment
  addNewComment(email: string, comment: string) {
    return this.http.post(
      environment.APIURL +
        `employee/student/addComment?empName=${this.empUsername}&studentEmail=${email}&commentContent=${comment}`,
      httpOptions
    );
  }

  // To delete an old comments
  deleteOldComment(id: number) {
    return this.http.post(
      environment.APIURL +
        `employee/delete/comment?commentId=${id}&empName=${this.empUsername}`,
      httpOptions
    );
  }

  // to edit old comments
  editOldComment(email: string, comment: string, id: number) {
    return this.http.post(
      environment.APIURL +
        `employee/student/edit/comment?empName=${this.empUsername}&studentEmail=${email}&updatedCommentContent=${comment}&commentId=${id}`,
      httpOptions
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  getAllApps() {
    return this.http.post(
      environment.APIURL + `employee/get_all_roles?empName=${this.empUsername}`,
      httpOptions
    );
  }

  getSiteApps() {
    return this.http.post(
      environment.APIURL + `get/app/website?empName=${this.empUsername}`,
      httpOptions
    );
  }

  getSchPrograms(sch: string) {
    return this.http.post(
      environment.APIURL + `get/progs/school?school=${sch}`,
      httpOptions
    );
  }

  // To get emps app
  getEmployeeApps() {
    return this.http.post(
      environment.APIURL + `employee/apps/get?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // get student's employeeID
  // empID is the last index in array
  getID() {
    return this.http.post(
      environment.APIURL + `profile/getstudentInfo?email=${this.email}`,
      httpOptions
    );
  }

  // delete the student's program application by employee
  // by pass applicationID
  deleteApp(appId: string) {
    return this.http.post(environment.APIURL + `delapp/${appId}`, httpOptions);
  }

  // get application by type
  // types is [requests, archive, pending-deposit, sent-to-school, to-be-sent]
  getAppByType(type: string, empId: string) {
    return this.http.post(
      environment.APIURL + `getapps/${type}/${empId}`,
      httpOptions
    );
  }

  // change application status in db
  changeAppStatus(
    status: string,
    empId: string,
    appId: number,
    studentUserName: string
  ) {
    return this.http.post(
      environment.APIURL +
        `updateapp/${status}/${empId}/${appId}/${studentUserName}`,
      httpOptions
    );
  }

  // To archive applications
  archiveSelectedApps(emails: string[], empId: string) {
    return this.http.post(
      environment.APIURL +
        `archive/applications?studentEmail=[${emails}]&empName=${empId}`,
      httpOptions
    );
  }

  // to get archived applications
  getArchivedApps(empId: string) {
    return this.http.post(
      environment.APIURL + `show/archive/applications?empName=${empId}`,
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
  // to change student score
  changeScore(email: string, score: string) {
    return this.http.post(
      environment.APIURL + `modifyscore?email=${email}&score=${score}`,
      httpOptions
    );
  }

  //  get all students in the amb array in db
  getAllEmbStudents() {
    return this.http.post(environment.APIURL + 'amb', httpOptions);
  }
  // change status of contacted in db
  changeContactStatus(id: number) {
    return this.http.post(environment.APIURL + `amb2/${id}`, httpOptions);
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

  // Delete students from ambassador
  deleteEmbStudents(id: number) {
    return this.http.post(
      environment.APIURL + `ambassador/delete?id=${id}`,
      httpOptions
    );
  }

  // add student to employee's student
  // by student username and employee email
  addToMyStudents(username: string, empId: string) {
    return this.http.post(
      environment.APIURL + `addstudent/${empId}/${username}`,
      httpOptions
    );
  }

  // add student to another employee
  addToAnotherEmp(username: string, empId: string) {
    return this.http.post(
      environment.APIURL + `addstudent/${empId}/${username}`,
      httpOptions
    );
  }

  // the application has three actions to deal with
  // accept == mean the application has been accepted in this level, so this app can move to the next level
  // reject == mean the application has been rejected
  // variable == the level where the app can move to [to-be-sent, sent-to-school, pending-deposit, archive],
  //empId == EmployeeID, id == application's id
  reponseToApplication(variable: string, empId: string, id: number) {
    return this.http.post(
      environment.APIURL + `updateapp/${variable}/${empId}/${id}`,
      httpOptions
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
    return this.http.post(environment.APIURL + 'getallschools', httpOptions);
  }

  // To get programs of school
  getSchoolProgs(school: string) {
    return this.http.post(
      environment.APIURL + `getallprogs/${school}`,
      httpOptions
    );
  }

  // To get programs of school for edit program
  getEditSchoolProgs(school: string) {
    return this.http.post(
      environment.APIURL + `/get/progs/school?school=${school}`,
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

  // change status of a studend
  changeStudentStatus(email: string, stats: string) {
    return this.http.post(
      environment.APIURL + `updatestatus/${email}/${stats}`,
      httpOptions
    );
  }

  // create students labels
  createLabel(labelName: string, empName: string, color: string) {
    return this.http.post(
      environment.APIURL + `newlabel/${labelName}/${empName}/${color}`,
      httpOptions
    );
  }

  // get all labels
  getEmpLabels(empName: string) {
    return this.http.post(
      environment.APIURL + `get_labels_emps/${empName}`,
      httpOptions
    );
  }

  // connect label id with student email
  connectIdWithEmail(id: number, email: string) {
    return this.http.post(
      environment.APIURL + `labelstudent/${id}/${email}`,
      httpOptions
    );
  }
  // Then get the labels
  getStudentLabels(email: string) {
    return this.http.post(
      environment.APIURL + `getlabelstud/${email}`,
      httpOptions
    );
  }

  // Delete a specific label
  deleteLabel(id: number, email: string) {
    return this.http.post(
      environment.APIURL + `delete_label/${email}/${id}`,
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

  // Create an application
  createApplication(
    program: string,
    school: string,
    email: string,
    city: string,
    empName: string
  ) {
    return this.http.post(
      environment.APIURL +
        `apply2/1?progname=${program}&schoolname=${school}&email=${email}&city=${city}&empid=${empName}`,
      httpOptions
    );
  }

  deleteLabels(ids: any[]) {
    return this.http.post(
      environment.APIURL + `delete/label?id=[${ids}]`,
      httpOptions
    );
  }

  // move student to trash bin
  moveToTrashBin(email: string, empId: string) {
    return this.http.post(
      environment.APIURL + `delete/student?email=${email}&emp=${empId}`,
      httpOptions
    );
  }

  // get students from trash bin
  getTrashBinStudents(empId: string) {
    return this.http.post(
      environment.APIURL + `gettrashed/students?empName=${empId}`,
      httpOptions
    );
  }

  // archive Selected Students
  archiveSelected(empId: string, emails: string[]) {
    return this.http.post(
      environment.APIURL + `archieve/student?email=[${emails}]&emp=${empId}`,
      httpOptions
    );
  }

  // restore archived students
  restoreArchivedStudents(emails: string[], empId: string) {
    return this.http.post(
      environment.APIURL +
        `restore/student/archive?empName=${empId}&studentEmail=[${emails}]`,
      httpOptions
    );
  }

  // restore archived students
  restoreArchivedApps(emails: string[], empId: string) {
    return this.http.post(
      environment.APIURL +
        `restore/archive/application?studentEmail=[${emails}]&empName=${empId}`,
      httpOptions
    );
  }

  // delete selected Students
  deleteSelected(empId: string, emails: string[]) {
    return this.http.post(
      environment.APIURL + `student/delete?email=${emails}&emp=${empId}`,
      httpOptions
    );
  }

  // restore deleted Students
  restoreDeletedStudents(emails: string[], empId: string) {
    return this.http.post(
      environment.APIURL +
        `restore/student/trash?empName=${empId}&studentEmail=[${emails}]`,
      httpOptions
    );
  }

  // To get all employees names
  getAllEmps() {
    return this.http.post(environment.APIURL + `getemps`, httpOptions);
  }
}

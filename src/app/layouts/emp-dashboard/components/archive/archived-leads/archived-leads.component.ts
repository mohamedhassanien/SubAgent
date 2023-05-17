import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-archived-leads',
  templateUrl: './archived-leads.component.html',
  styleUrls: ['./archived-leads.component.scss'],
})
export class ArchivedLeadsComponent implements OnInit {
  email!: string;
  empId!: any;
  myApplications: Array<any> = [];
  myStudents: Array<any> = [];

  searchText: string = '';
  studentSearch: string = '';

  constructor(private employee: EmployeeService) {
    this.empId = localStorage.getItem('EmpName');
  }

  ngOnInit(): void {
    // this.getArchivedApps();
    this.getArchivedStudents();
  }

  date = new FormControl(moment());
  month: number = 0;
  fullYear: number = 0;

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.month = this.date.value._d.getMonth() + 1;
    this.fullYear = this.date.value._d.getFullYear();
    console.log(this.month, this.fullYear);
    var arrayOfDates: any = [];
    this.myApplications.forEach((arr) => {
      if (this.month == new Date(arr[9] * 1000).getMonth() + 1) {
        arrayOfDates.push(arr);
      }
    });
    this.myApplications = arrayOfDates;
    console.log(arrayOfDates);
    datepicker.close();
  }
  resetDate() {
    this.employee.getArchivedApps(this.empId).subscribe(
      (data: any) => {
        if (data.length > 0) {
          console.log(data);
          return (this.myApplications = data);
        } else return false;
      },
      () => {
        alert('something went wrong, Reload the page');
      }
    );
  }

  // getArchivedApps() {
  //   this.employee.getArchivedApps(this.empId).subscribe(
  //     (data: any) => {
  //       if (data.length > 0) {
  //         console.log(data);
  //         return (this.myApplications = data);
  //       } else return false;
  //     },
  //     () => {
  //       alert('something went wrong, Reload the page');
  //     }
  //   );
  // }

  getArchivedStudents() {
    let empId = String(localStorage.getItem('EmpName'));
    this.employee.getArchivedStudents(empId).subscribe(
      (data: any) => {
        console.log(data);
        
        if (data.length > 0) {
          console.log(data);
          return (this.myStudents = data);
        } else return false;
      },
      () => {
        alert('something went wrong, Reload the page');
      }
    );
  }


  // to catch emails
  arrayOfEmail: string[] = [];
  getEmails(email: string) {
    if (this.arrayOfEmail.includes(email)) {
      let index = this.arrayOfEmail.indexOf(email);
      this.arrayOfEmail.splice(index, 1);
    } else {
      this.arrayOfEmail.push(email);
    }
    console.log(this.arrayOfEmail);
  }

  // To restore archived students
  restoreStudents() {
    let empId = String(localStorage.getItem('EmpName'));

    this.employee
      .restoreArchivedStudents(this.arrayOfEmail, empId)
      .subscribe((data) => {
        console.log(data);
        this.getArchivedStudents();
      });
  }

  // open(content) {
  //   this.modalService.open(content);
  // }

  // closeModal() {
  //   this.modalService.dismissAll();
  //   this.schoolSelected = ''
  //   this.allComments = []
  //   // to reset deleteForm
  //   let frmArray = this.deleteForm.get('labelName') as FormArray;
  //   frmArray.clear();
  //   this.refreshStudents()
  // }

  sortingDownName: boolean = false;
  sortingUpName: boolean = true;
  // sorting name
  sortName() {
    this.sortingDownName = !this.sortingDownName;
    this.sortingUpName = !this.sortingUpName;
    if (this.sortingDownName == false) {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[0] < b[0] ? 1 : -1;
      });
    } else {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[0] > b[0] ? 1 : -1;
      });
    }
  }
  sortingDownNameApp: boolean = false;
  sortingUpNameApp: boolean = true;
  // sorting name
  sortNameApp() {
    this.sortingDownNameApp = !this.sortingDownNameApp;
    this.sortingUpNameApp = !this.sortingUpNameApp;
    if (this.sortingDownNameApp == false) {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[8] < b[8] ? 1 : -1;
      });
    } else {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[8] > b[8] ? 1 : -1;
      });
    }
  }

  sortingDownSchoolName: boolean = false;
  sortingUpSchoolName: boolean = true;
  // sorting name
  sortSchoolName() {
    this.sortingDownSchoolName = !this.sortingDownSchoolName;
    this.sortingUpSchoolName = !this.sortingUpSchoolName;
    if (this.sortingDownSchoolName == false) {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[2] < b[2] ? 1 : -1;
      });
    } else {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[2] > b[2] ? 1 : -1;
      });
    }
  }

  sortingDownProgramName: boolean = false;
  sortingUpProgramName: boolean = true;
  // sorting name
  sortProgramName() {
    this.sortingDownProgramName = !this.sortingDownProgramName;
    this.sortingUpProgramName = !this.sortingUpProgramName;
    if (this.sortingDownProgramName == false) {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[1] < b[1] ? 1 : -1;
      });
    } else {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[1] > b[1] ? 1 : -1;
      });
    }
  }

  sortDownEmailApp: boolean = false;
  sortUpEmailApp: boolean = true;
  // sorting Email
  sortEmailApp() {
    this.sortDownEmailApp = !this.sortDownEmailApp;
    this.sortUpEmailApp = !this.sortUpEmailApp;
    if (this.sortDownEmailApp == false) {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[0] < b[0] ? 1 : -1;
      });
    } else {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[0] > b[0] ? 1 : -1;
      });
    }
  }

  sortingDownNat: boolean = false;
  sortingUpNat: boolean = true;
  // sorting Nationality
  sortNat() {
    this.sortingDownNat = !this.sortingDownNat;
    this.sortingUpNat = !this.sortingUpNat;
    if (this.sortingDownNat == false) {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[5] < b[5] ? 1 : -1;
      });
    } else {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[5] > b[5] ? 1 : -1;
      });
    }
  }

  sortingDownStatusApp: boolean = false;
  sortingUpStatusApp: boolean = true;
  // sorting Status
  sortStatusApp() {
    this.sortingDownStatusApp = !this.sortingDownStatusApp;
    this.sortingUpStatusApp = !this.sortingUpStatusApp;
    if (this.sortingDownStatusApp == false) {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[7] < b[7] ? 1 : -1;
      });
    } else {
      this.myApplications = this.myApplications.reverse();
      this.myApplications.sort(function (a, b) {
        return a[7] > b[7] ? 1 : -1;
      });
    }
  }

  sortingDownStatus: boolean = false;
  sortingUpStatus: boolean = true;
  // sorting Status
  sortStatus() {
    this.sortingDownStatus = !this.sortingDownStatus;
    this.sortingUpStatus = !this.sortingUpStatus;
    if (this.sortingDownStatus == false) {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[13] < b[13] ? 1 : -1;
      });
    } else {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[13] > b[13] ? 1 : -1;
      });
    }
  }

  sortDownEmail: boolean = false;
  sortUpEmail: boolean = true;
  // sorting Email
  sortEmail() {
    this.sortDownEmail = !this.sortDownEmail;
    this.sortUpEmail = !this.sortUpEmail;
    if (this.sortDownEmail == false) {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[4] < b[4] ? 1 : -1;
      });
    } else {
      this.myStudents = this.myStudents.reverse();
      this.myStudents.sort(function (a, b) {
        return a[4] > b[4] ? 1 : -1;
      });
    }
  }

  // searchText : string = ''
  // page = 1;
  // type !: any;
  // pageSize = 5;
  // applications : Array<any> = [];
  // empId !: any;
  // constructor(private employeeServ : EmployeeService, private router : Router) {
  // }

  // ngOnInit(): void {
  //   // get employeeID
  //   this.empId = this.employeeServ.getID()
  //   .subscribe(
  //     (data : any) => {
  //       if (data) return this.empId = data[0][2]
  //       else return false
  //     },
  //     () => { alert('something wrong please try again')},
  //     () => {
  //       // after complete
  //       // pass the empID to API to get the all the employee's application by type "archive"
  //       this.employeeServ.getAppByType('archive', this.empId)
  //       .subscribe(
  //         (data : any) => {
  //           if (data) {
  //             return this.applications = data
  //           }
  //           else return false
  //         }
  //       )
  //     }
  //   )
  // }

  // // pass empId, programName, schoolName, studentEmail, city, appID as params in the link
  // // navigate to archived-profile componant
  // studentProfile(empId : string, programName:string, schoolName:string, studentEmail:string, city:string, appID : number){
  //   this.router.navigate([`/employee/archived-profile/${empId}/${programName}/${schoolName}/${studentEmail}/${city}/${appID}`])
  // }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  // encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  empUserName: string = String(localStorage.getItem('userName'));
  empEmail: string = String(localStorage.getItem('userEmail'));
  constructor(
    private _EmployeeService: EmployeeService,
  ){}
  ngOnInit(): void {
    if (
      this.empUserName === 'Nicolas' ||
      this.empUserName === 'Oumaima EL HADDADI'||
      this.empUserName==='Salah'
    ){
      this.moringmail();
    }
  
  //  this.EmployeeEmail();
   this.ProspectNotification();
  }
  moringmail() {
    this._EmployeeService.MorningMail().subscribe((data: any) => {
    });
  }
  EmployeeEmail(){
    this._EmployeeService.EmployeeEmail(this.empUserName,this.empEmail).subscribe((data: any) => {
    });
  }
  ProspectNotification(){
    this._EmployeeService.ProspectNotification(this.empUserName).subscribe((data: any) => {
    });
  }
}


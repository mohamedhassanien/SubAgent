import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  // encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router
  ) {
    this._EmployeeService.checkType().subscribe((data) => {
      if (data === true) {
        console.log(data);
        localStorage.clear();
        this._Router.navigate(['/auth/login']).then(() => {
          window.location.reload();
        });
      }
    });
  }
  ngOnInit(): void {}
}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Subagent } from 'src/app/shared/models/subagent';
import { AgentService } from 'src/app/shared/services/agent/agent.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: '[app-sub-agent]',
  templateUrl: './sub-agent.component.html',
  styleUrls: ['./sub-agent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubAgentComponent implements OnInit {
  @Input('subAgent') subAgent!: Subagent;
  @Input('index') index!: number;

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  constructor(
    private _ModalService: NgbModal,
    private _EmployeesService: EmployeeService
  ) {}

  ngOnInit(): void {}

  // To confirm action
  confirmAction(
    message: string = 'Your work has been saved',
    button: boolean = false
  ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: button,
      timer: 1500,
    });
  }

  // To confirm error
  errorAction(message: string = 'Something went wrong!') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  goToProfile(element: any, identifier: string) {
    if (identifier === 'email' && element.readOnly)
      window.location.href = `mailto:${element.value}`;
    else if (identifier === 'phone' && element.readOnly)
      window.location.href = `https://api.whatsapp.com/send?phone=${element.value}`;
  }

  // To delete subagent
  deleteSubAgent(username: string, email: string) {
    this._EmployeesService
      .deleteSubAgent(username, email)
      .subscribe((data) => console.log(data));
  }

  // To open any modal
  openModal(element: any, className: string, size: string) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }
}

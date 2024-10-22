import { Component, OnInit } from '@angular/core';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import format from 'date-fns/format';
// import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  // closeResult = '';
  // meetings!: Array<object>;

  // constructor(private modalService: NgbModal) {
  //   this.meetings = [{}, {}, {}, {}, {}, {}, {}, {}]
  // }

  // config: CountdownConfig = {
  //   leftTime: 60 * 60 * 24 * 365 * (2050 - 1970),
  //   format: 'dd : HH : mm : ss',
  //   formatDate: ({ date, formatStr }) => format(date, formatStr),
  // };

  // // Ticket Model
  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  ngOnInit(): void {}
}

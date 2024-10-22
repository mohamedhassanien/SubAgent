import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ChatBotService } from 'src/app/shared/services/chat-bot/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit {
  student!: any;
  progressCount!:any
  progressWidth!:any
  chatData: any;
  fieldsOfInterest: any;
  otherFields: string = '';
  stuName = String(localStorage.getItem('name'));

  constructor(private _ChatbotService: ChatBotService) {
    // const token = this._Router.url.split('/')[3];
  }

  arrToString = '';
  getData(e: any) {
    this.chatData = e;
    this.fieldsOfInterest = this.chatData[1].slice(0, 2);
    this.arrToString = JSON.stringify(this.chatData).replace(/&/g, 'and');
  }

  getOtherFields(e: any) {
    this.otherFields = e;
  }
 
  ngOnInit(): void {
    this._ChatbotService.getInfo().subscribe((data: any) => {
      const [
        {
          data: [student],
        },
      ] = data;

      this.student = student;
    });

  }

  progres(e:any){
   this.progressCount = e
  }
  progresw(e:any){
    this.progressWidth = e
   }
}
 

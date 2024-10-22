import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  today = new Date();
  time:any;
  commeMsg = new Array()
  commeProgMsg = new Array()
  showDots = false;
  showProDots = false;
  inputData = false;
  inputValue:any;
  commeThreadid:any;

  welcomeMsg = true;
  welcomeProgMsg = true;
  visaTab = true;
  progTab = false;

  constructor(private _EmployeeService: EmployeeService,) { }

  ngOnInit(): void {
    localStorage.setItem('threadid', '0');
    this.time = this.today.getHours() + ":" + this.today.getMinutes();
  }
  sendData(): void {
    this.welcomeMsg = false;

    let msg =  this.inputValue;
    let threadid;
    this.showDots = true;

    let theMsg = {
      "role": "user",
      'message': msg
    }
    this.commeMsg.push(theMsg);

    console.log(this.commeMsg);
    this.inputValue = '';

    if(localStorage.getItem('threadid') == '' || undefined || null){
      threadid = 0;
    }else{
      threadid = localStorage.getItem('threadid');
    }
    this._EmployeeService.getMsgChatBotPage(threadid, msg).subscribe(response => {
      this.showDots = false;
      this.commeMsg = response[0].message;
      this.commeThreadid = response[0].threadid;
      threadid = response[0].threadid;
      this.inputValue = '';


      localStorage.setItem('threadid', threadid);

      
    });
  }
  sendProgData(): void {
    this.welcomeProgMsg = false;
    let msg =  this.inputValue;
    let threadid;
    this.showProDots = true;

    let theMsg = {
      "role": "user",
      'message': msg
    }
    this.commeProgMsg.push(theMsg);

    console.log(this.commeProgMsg);
    this.inputValue = '';

    if(localStorage.getItem('threadid') == '' || undefined || null){
      threadid = 0;
    }else{
      threadid = localStorage.getItem('threadid');
    }
    this._EmployeeService.getMsgChatBotMoroccoPage(threadid, msg).subscribe(response => {
      this.showProDots = false;
      this.commeProgMsg = response[0].message;
      this.commeThreadid = response[0].threadid;
      threadid = response[0].threadid;
      this.inputValue = '';


      localStorage.setItem('threadid', threadid);

      
    });
  }
  changeVisaTab(){
    this.visaTab = true;
    this.progTab = false;
  }
  changeProgTab(){
    this.visaTab = false;
    this.progTab = true;
  }

}

import { Component, VERSION, ElementRef, ViewChild, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot-event.component.html',
  styleUrls: ['./chat-bot-event.component.scss'],
  queries: {
    'contentRef': new ViewChild('contentRef')
  }
})
export class ChatBotEventComponent implements OnInit {



  name = 'Angular ' + VERSION.major;
  content : any;
  postedContent = [];
  contentRef!: ElementRef;
  contentHeight;

  today = new Date();
  time:any;
  commeMsg = new Array()
  showDots = false;
  inputData = false;
  inputValue:any;
  commeThreadid:any;

  welcomeMsg = true;

  constructor(private _EmployeeService: EmployeeService,) { }

  addContent(){
    this.content = '';
    this.contentHeight = this.contentRef.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(){
    var test = this.contentHeight != this.contentRef.nativeElement.scrollHeight 
      //&& this.contentRef.nativeElement.scrollHeight != (this.contentRef.nativeElement.scrollTop + this.contentRef.nativeElement.offsetHeight);
    console.log(test);

    if (this.contentHeight != this.contentRef.nativeElement.scrollHeight && this.contentRef.nativeElement.scrollHeight != (this.contentRef.nativeElement.scrollTop + this.contentRef.nativeElement.offsetHeight)){
      this.contentRef.nativeElement.scrollTo(0, this.contentRef.nativeElement.scrollHeight);
    }
  }

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
    
    this._EmployeeService.getMsg(threadid, msg).subscribe(response => {
      this.addContent();
      console.log('this is scrolled');

      this.showDots = false;
      this.commeMsg = response[0].message;
      this.commeThreadid = response[0].threadid;
      threadid = response[0].threadid;
      this.inputValue = '';


      localStorage.setItem('threadid', threadid);

      
    });
  }
}

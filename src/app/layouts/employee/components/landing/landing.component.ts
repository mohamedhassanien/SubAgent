import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {

  @ViewChild('scrollMsg') private scrollMsg = {} as ElementRef;

  fullName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));
  showFiller: boolean = false;
  name = localStorage.getItem('name') as String;
  mainRouter!: string;
  secRouter!: string;

  docElement!: HTMLElement;
  isFullScreen: boolean = false;

  notifications!: any[];

  screenWidth!: number;

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 2];

  profilePicture: string = String(localStorage.getItem('picture'));
  checkedArr: any[] = [];


  inputValue:any;
  commeMsg = new Array()
  commeThreadid:any;
  chatBot = false;

  today = new Date();
  time:any;
  showDots = false;
  inputData = false;
  

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    private formBuilder: FormBuilder
  ) {
    this._EmployeeService.getNotifications().subscribe((data: any) => {
      this.notifications = data;
    });
    this.screenWidth = window.innerWidth;
  }

  bookSessionform = this.formBuilder.group({
    meetingLink: ['', [Validators.required]],
    dateLink: ['', [Validators.required]],
  });

  get link() {
    return this.bookSessionform.get('meetingLink');
  }
  get date() {
    return this.bookSessionform.get('dateLink');
  }

  submit(formData: FormGroup) {


  }

  dateyear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.docElement = document.documentElement;
    localStorage.setItem('threadid', '0');
    this.time = this.today.getHours() + ":" + this.today.getMinutes();
  }

  // onHover(e: any, id: any) {
  //   if (e.isTrusted) {
  //     this._EmployeeService.checkNoti(id).subscribe((data) => {
  //       console.log(data);
  //     });
  //   }
  // }
  checkNoti(id: any) {
    
      this._EmployeeService.checkNoti(id).subscribe((data) => {
        
      });
 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = event.target.innerWidth;
  }

  // To logout employee
  signOut() {
    localStorage.clear();
    this._Router.navigate(['/auth', 'login']);
  }

  getStudintUsername(studentUserName, id){
    localStorage.setItem('StudintName', studentUserName)
    if( this._Router.url.split('/').pop() === 'notifications'){
      window.location.reload();
    }else{
      this._Router.navigate(['/employees', this.empUserName, 'notifications']);
    }
    this.checkNoti(id);
  }

  // To toggle fullscreen
  toggleFullScreen() {
    if (!this.isFullScreen) {
      this.docElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  // To get date
  getDate(time: number) {
    const reactionTime = new Date(time).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = new Date(currentTime - reactionTime);
  }

  employeeePage() {
    if (
      this.empUserName == 'Nicolas' ||
      this.empUserName == 'Oumaima' ||
      this.empUserName == 'Salah' ||
      this.empUserName == 'Mohamed'
    ) {
      this._Router.navigate([
        '/employees',
        this.fullName,
        'dashboard',
        'employee-manegment',
      ]);
    } else {
      this._Router.navigate([
        '/employees',
        this.fullName,
        'dashboard',
        'employee-team',
      ]);
    }
  }

  // drawerCustomToggle(drawer) {
  //   console.log(drawer.opened);
  //   if (drawer.opened) {
  //     drawer._elementRef.nativeElement.classList.add('opened');
  //   } else {
  //     drawer._elementRef.nativeElement.classList.remove('opened');
  //   }
  // }

  
  openChat(){
    this.chatBot = !this.chatBot;
  }



  sendData(): void {

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
      this.showDots = false;
      this.commeMsg = response[0].message;
      this.commeThreadid = response[0].threadid;
      threadid = response[0].threadid;
      this.inputValue = '';


      localStorage.setItem('threadid', threadid);

      
    });
  }
}

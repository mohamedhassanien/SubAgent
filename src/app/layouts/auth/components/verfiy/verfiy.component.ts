// import { DataSearchService } from '../../../../shared/services/Data/data-search.service';
// import { Subscription } from 'rxjs';
// import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verfiy',
  templateUrl: './verfiy.component.html',
  styleUrls: ['./verfiy.component.scss'],
})
export class VerfiyComponent implements OnInit {
  // Variables
  timer: number = 60;

  // Condition
  isLoading: boolean = false;
  send: string = 'Resend';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.calculateTimer();
  }

  calculateTimer() {
    setInterval(() => {
      if (this.timer != 0) this.timer = this.timer - 1;
    }, 1000);
  }

  resend() {
    this.isLoading = true;
    let email: string = String(sessionStorage.getItem('email'));
    let name: string = String(sessionStorage.getItem('name'));
    this.authService.resendEmail(email, name).subscribe((data: any) => {
      this.send = 'Send again';
      this.timer = 60;
      this.isLoading = false;
    });
  }

  // searchForm : FormGroup;
  // messageName !: string;
  // subscription !: Subscription;

  // constructor( private data: DataSearchService,
  //   private router : Router,  formBuilder : FormBuilder) {
  //   this.searchForm = formBuilder.group(
  //     {
  //       searchInput : ['']
  //     }
  //   )
  // }

  // ngOnInit(): void {
  //   this.subscription = this.data.currentMessageName.subscribe(message => this.messageName = message)
  // }

  // onSearch(input : any){
  //   this.data.changeName(input.value)
  //   this.router.navigate(['/landing/programs'])
  // }
}

import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSearchService } from 'src/app/shared/services/Data/data-search.service';

@Component({
  selector: 'app-check-inbox',
  templateUrl: './check-inbox.component.html',
  styleUrls: ['./check-inbox.component.scss']
})
export class CheckInboxComponent implements OnInit {
  searchForm : FormGroup;
  messageName !: string;
  subscription !: Subscription;

  constructor( private data: DataSearchService,
    private router : Router,  formBuilder : FormBuilder) { 
    this.searchForm = formBuilder.group(
      {
        searchInput : ['']
      }
    )
  }

  ngOnInit(): void {
    // in search input
    // get the input value and send it to data-search service
    // search in the programs
    this.subscription = this.data.currentMessageName.subscribe(message => this.messageName = message)
  }
  
  onSearch(input : any){
    this.data.changeName(input.value)
    this.router.navigate(['/landing/programs'])
  }

}

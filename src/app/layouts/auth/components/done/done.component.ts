import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSearchService } from 'src/app/shared/services/Data/data-search.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
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
    this.subscription = this.data.currentMessageName.subscribe(message => this.messageName = message)
  }
  
  onSearch(input : any){
    this.data.changeName(input.value)
    this.router.navigate(['/landing/programs'])
  }

}

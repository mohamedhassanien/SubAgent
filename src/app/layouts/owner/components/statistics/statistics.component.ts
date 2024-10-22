import { IStudent } from './../../../../shared/models/student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  students!: IStudent[];

  page = 1;
  pageSize = 10;
  
  constructor() {
    this.students = [
      {
        name: 'Fleece Marigold',
        email: 'Madihaelshamaa97@gmail.com',
        date: '2015-03-25',
        fees: 'paid',
        program: 'Science',
      }
    ]
  }
  ngOnInit(): void {
  }

}

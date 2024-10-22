import { IEvents } from './../../../../shared/models/events';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  // events !: IEvents[]
  // page = 20;
  // pageSize = 9;

  // constructor() {
  //   this.events = [
  //     {
  //       date: 'Septem',
  //       name: 'Our International students',
  //       in: 'Paris,France',
  //       instructorName: 'Freddy Lewis',
  //       instructorJob: 'Speaker'
  //     },
  //     {
  //       date: 'Septem',
  //       name: 'Our International students',
  //       in: 'Paris,France',
  //       instructorName: 'Freddy Lewis',
  //       instructorJob: 'Speaker'
  //     },
  //     {
  //       date: 'Septem',
  //       name: 'Our International students',
  //       in: 'Paris,France',
  //       instructorName: 'Freddy Lewis',
  //       instructorJob: 'Speaker'
  //     },
  //     {
  //       date: 'Septem',
  //       name: 'Our International students',
  //       in: 'Paris,France',
  //       instructorName: 'Freddy Lewis',
  //       instructorJob: 'Speaker'
  //     },
  //     {
  //       date: 'Septem',
  //       name: 'Our International students',
  //       in: 'Paris,France',
  //       instructorName: 'Freddy Lewis',
  //       instructorJob: 'Speaker'
  //     },
  //     {
  //       date: 'November',
  //       name: 'Our students In Paris',
  //       in: 'Germany,Berlin',
  //       instructorName: 'Aya Lewis',
  //       instructorJob: 'Teacher'
  //     },
  //   ]
  // }

  ngOnInit(): void {}
}

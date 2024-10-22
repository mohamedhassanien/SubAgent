import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    document.body.scrollTop = 0;
  }
}

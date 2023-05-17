import { Component, HostListener, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/layouts/landing/programs/services/programs.service';

import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss'],
})
export class MyWishlistComponent implements OnInit {
  // Variables
  programs!: any[];
  screenWidth!: number;

  constructor(
    private _StudentsService: StudentsService,
    private _ProgramService: ProgramsService
  ) {
    // To call all wishlisted programs
    this.getWishlistedPrograms();
  }

  ngOnInit(): void {}

  // To get all wishlisted Programs if any
  getWishlistedPrograms() {
    const userName = String(localStorage.getItem('userName'));
    this._StudentsService
      .getWishlistedPrograms(userName)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 400) {
          this.programs = [];
        } else {
          const [{ programs }] = data;
          this.programs = programs;
        }
      });
  }

  // Remove wishlisted programs
  removeFromWishlist(id: number) {
    const studentName = String(localStorage.getItem('userName'));
    console.log(studentName, id);
    this._ProgramService
      .removeWishlistedProgram(id, studentName)
      .subscribe(() => {
        this.getWishlistedPrograms();
      });
  }

  // To get screen Width
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }
  // To get card background color for small screens
  getColor() {
    if (this.screenWidth < 768) {
      return 'linear-gradient(244deg, #FFF7F7 0%, #EDEEFF 100%)';
    } else {
      return '#F7F7F7';
    }
  }
}

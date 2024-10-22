import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsService } from 'src/app/shared/services/programs/programs.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  // Variables
  programs!: any[];
  screenWidth!: number;
  lengthWhshlist!: any;
  noProgramsWishlist: boolean = false;

  constructor(
    private _StudentsService: StudentsService,
    private _ProgramService: ProgramsService,
    private _SharedService: SharedService,
    private _router: Router
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
          this.noProgramsWishlist = true;
        } else {
          const [{ programs }] = data;
          programs.forEach((program) => {
            program.city = program.city.replace(' ', '').split('/');
            program.intake = program.intake.replace(' ', '').split('/');
            program.lang = program.lang.replace(' ', '').split('/');
          });
          this.programs = programs;
          this._SharedService.wishlistLength.emit(this.programs.length);
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
}

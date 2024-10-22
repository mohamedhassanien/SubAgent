import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramsService } from 'src/app/shared/services/programs/programs.service';

@Component({
  selector: 'app-upper-header',
  templateUrl: './upper-header.component.html',
  styleUrls: ['./upper-header.component.scss'],
})
export class UpperHeaderComponent implements OnInit {
  offer: string = '';
  link: string = '';

  location!: string;

  constructor(
    private _programsService: ProgramsService,
    private _Http: HttpClient
  ) {
    // this.getLocation();
  }

  ngOnInit(): void {
    this.getUpdates();
  }

  // To get IP address and location
  getLocation() {
    this._Http
      .get<any>('https://geolocation-db.com/json/')
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((data: any) => {
        const { country_name } = data;
        this.location = country_name;
      });
  }

  getUpdates() {
    this._programsService.getUpdates().subscribe((data: any) => {
      if (data.status == 200) {
        this.offer = data.updates;
        this.link = data.link;
      }
    });
  }
}

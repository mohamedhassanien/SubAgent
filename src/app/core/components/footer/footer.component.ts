import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  location!: string;

  constructor(private _Http: HttpClient) {
    this.getLocation();
  }

  ngOnInit(): void {}

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

  isLoggedIn() {
    return (
      Boolean(localStorage.getItem('isLoggedIn')) ||
      Boolean(localStorage.getItem('EmpLoggedIn'))
    );
  }
}

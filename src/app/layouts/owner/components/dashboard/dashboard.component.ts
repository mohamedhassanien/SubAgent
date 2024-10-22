import { ICountry } from './../../../../shared/models/country';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countries!: ICountry[];
  COUNTRIES: ICountry[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 1409517397
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      population: 1409517397
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      population: 1409517397
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      population: 1409517397
    }
  ];

  page = 1;
  pageSize = 10;
  collectionSize = this.COUNTRIES.length;

  constructor() { 
    this.countries = this.COUNTRIES;
    this.refreshCountries();  
  }
  
  refreshCountries() {
    this.countries = this.COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  ngOnInit(): void {
  }

}

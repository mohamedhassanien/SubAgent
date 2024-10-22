import { ICountry } from './../../../../shared/models/country';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  COUNTRIES: ICountry[] = [
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      population: 64979548
    },
    {
      name: 'Germany',
      flag: 'b/ba/Flag_of_Germany.svg',
      population: 82114224
    },
    {
      name: 'Indonesia',
      flag: '9/9f/Flag_of_Indonesia.svg',
      population: 263991379
    },
    {
      name: 'Tuvalu',
      flag: '3/38/Flag_of_Tuvalu.svg',
      population: 11097
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

  countries!: ICountry[];

  constructor() {
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

import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { HousingService } from 'src/app/layouts/marketplace/services/housing.service';

@Component({
  selector: 'app-housinganywhere',
  templateUrl: './housinganywhere.component.html',
  styleUrls: ['./housinganywhere.component.scss'],
})
export class HousinganywhereComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  // Variables for the slider
  value: number = 0;
  highValue: number = 2500;

  valueSm: number = 0;
  highValueSm: number = 2500;

  // valueSm: number = 100;
  // highValueSm: number = 2400;

  options: Options = {
    floor: 0,
    ceil: 2500,
  };
  // optionsSm: Options = {
  //   floor: 100,
  //   ceil: 2400,
  // };

  // listings
  listings: any = {};
  houses: any = [];

  // variables
  searchText: string = '';

  moveIn: string = '';
  moveOut: string = '';

  house: boolean = false;
  building: boolean = false;
  apartment: boolean = false;

  furn: boolean = false;
  unFurn: boolean = false;

  reg: boolean = false;

  dishWasher: boolean = false;
  washingMachine: boolean = false;
  dryer: boolean = false;
  airConditioning: boolean = false;
  heating: boolean = false;

  bathroom: boolean = false;
  balcony: boolean = false;
  garden: boolean = false;
  kitchen: boolean = false;
  pets: boolean = false;
  parking: boolean = false;
  wheelchair: boolean = false;
  basement: boolean = false;

  filterBox: boolean = false;

  page: any = 1;
  pageSize: any = 9;

  isLoading: boolean = false;

  constructor(private _HousingService: HousingService) {}

  ngOnInit(): void {
    this.getHousingAnywhereData();
  }

  openFilterScreen() {
    this.filterBox = true;
  }
  // To close filter screen on small screens
  closeFilterScreen() {
    this.filterBox = false;
  }

  getHousingAnywhereData() {
    this.isLoading = true;
    this._HousingService.getHousingAnywhereData().subscribe((data: any) => {
      this.listings = data.listings;
      console.log(this.listings);

      this.houses = this.shuffle(this.listings);
      // console.log(this.houses);

      this.isLoading = false;
    });
  }

  shuffle(programs: any[]) {
    let oldElement;
    for (let i = programs.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = programs[i];
      programs[i] = programs[rand];
      programs[rand] = oldElement;
    }
    return programs;
  }

  clearAll() {
    // variables
    this.searchText = '';

    this.moveIn = '';
    this.moveOut = '';

    this.value = 0;
    this.highValue = 2500;

    this.house = false;
    this.building = false;
    this.apartment = false;

    this.furn = false;
    this.unFurn = false;

    this.reg = false;

    this.dishWasher = false;
    this.washingMachine = false;
    this.dryer = false;
    this.airConditioning = false;
    this.heating = false;

    this.bathroom = false;
    this.balcony = false;
    this.garden = false;
    this.kitchen = false;
    this.pets = false;
    this.parking = false;
    this.wheelchair = false;
    this.basement = false;
  }
}

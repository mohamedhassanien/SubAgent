import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-housing-insurance',
  templateUrl: './housing-insurance.component.html',
  styleUrls: ['./housing-insurance.component.scss']
})
export class HousingInsuranceComponent implements OnInit {
  showIcon: boolean = true;
  showIcon2: boolean = true;
  showIcon3: boolean = true;
  showIcon4: boolean = true;
  showIcon5: boolean = true;
  showIcon6: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  showIconBtn() {
    this.showIcon = !this.showIcon;
    this.showIcon2 = true;
    this.showIcon3 = true;
    this.showIcon4 = true;
    this.showIcon5 = true;
    this.showIcon6 = true;
  }
  showIconBtn2() {
    this.showIcon2 = !this.showIcon2;
    this.showIcon = true;
    this.showIcon3 = true;
    this.showIcon4 = true;
    this.showIcon5 = true;
    this.showIcon6 = true;
  }
  showIconBtn3() {
    this.showIcon3 = !this.showIcon3;
    this.showIcon = true;
    this.showIcon2 = true;
    this.showIcon4 = true;
    this.showIcon5 = true;
    this.showIcon6 = true;
  }
  showIconBtn4() {
    this.showIcon4 = !this.showIcon4;
    this.showIcon = true;
    this.showIcon2 = true;
    this.showIcon3 = true;
    this.showIcon5 = true;
    this.showIcon6 = true;
  }


}

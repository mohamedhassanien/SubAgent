import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appartement-inventory',
  templateUrl: './appartement-inventory.component.html',
  styleUrls: ['./appartement-inventory.component.scss']
})
export class AppartementInventoryComponent implements OnInit {
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
  showIconBtn5() {
    this.showIcon4 = true;
    this.showIcon = true;
    this.showIcon2 = true;
    this.showIcon3 = true;
    this.showIcon5 = !this.showIcon5;
    this.showIcon6 = true;
  }
  showIconBtn6() {
    this.showIcon4 = true;
    this.showIcon = true;
    this.showIcon2 = true;
    this.showIcon3 = true;
    this.showIcon5 = true;
    this.showIcon6 = !this.showIcon6;
  }

}

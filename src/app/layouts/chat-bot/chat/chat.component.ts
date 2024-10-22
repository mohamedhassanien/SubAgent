import { ChatBotService } from 'src/app/shared/services/chat-bot/chat-bot.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { FormBuilder } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ChangeContext,
  LabelType,
  Options,
  PointerType,
} from '@angular-slider/ngx-slider';
interface interest {
  name: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input('student') student!: any;
  @Output() profileData = new EventEmitter<any[]>();
  @Output() inputValue = new EventEmitter<string>();
  @Output() budgetValue = new EventEmitter<string>();
  @Output() progressCount = new EventEmitter<any>();
  @Output() progressWidth = new EventEmitter<any>();

  defStep: boolean = true;
  eduStep: boolean = false;
  fieldsStep: boolean = false;
  langStep: boolean = false;
  budgetStep: boolean = false;

  isSchool: boolean = false;
  isUniversity: boolean = false;
  graduated: boolean = false;
  isNo: boolean = false;
  isYes: boolean = false;

  englishlang: boolean = false;
  frenchlang: boolean = false;
  totlang: boolean = false;

  yeshave: boolean = false;
  ilets: boolean = false;
  toefl: boolean = false;
  duolong: boolean = false;
  easy: boolean = false;

  yeshave1: boolean = false;
  scoreF: boolean = false;

  stepA: boolean = true;
  stepB: boolean = false;
  stepC: boolean = false;
  stepD: boolean = false;
  stepE: boolean = false;
  stepScore: boolean = false;
  showIcon: boolean = false;
  lastStep: boolean = false;
  // progressCount: any = '0%';
  // progressWidth: any = 0;
  imgHeight: number = 10;
  minValue: number = 5000;
  maxValue: number = 15000;
  x: any;
  options: Options = {
    floor: 0,
    ceil: 20000,
    step: 1,
    minRange: 5000,
    maxRange: 15000,
    pushRange: true,
  };

  otherInterst: string = '';
  logText: string = '';

  profileInfo: any[] = [];
  interests!: interest[];

  selectedInterest: any[] = [];

  business: boolean = false;
  art: boolean = false;
  law: boolean = false;
  engineering: boolean = false;
  computer: boolean = false;
  marketing: boolean = false;
  other: boolean = false;

  education_level = 0;
  school_grade = 0;
  university_level = 0;
  highest_education = 0;
  fieldOfInterst: number [] = [];
  language_preference = 0;
  proficiency_english = 0;
  english_test = 0;
  proficiency_french = 0;
  french_test = 0;

  studentInfo : {
    education_level : number,
    grade : number,
    fieldOfInterst : number [],
    language_preference : number,
    proficiency_english : number,
    english_test : number,
    eng_testScore : number,
    proficiency_french : number,
    french_test : number,
    fr_testScore : number,
    budget : number
  } = {
    education_level : 0,
    grade : 0,
    fieldOfInterst : [],
    language_preference : 0,
    proficiency_english : 0,
    english_test : 0,
    eng_testScore : 0,
    proficiency_french : 0,
    french_test : 0,
    fr_testScore : 0,
    budget : 0
  };

//   highest_level
// field_intereset
// language_study
// eng_language_test
// eng_test_score
// fr_language_test
// fr_test_name
// fr_test_score
// budget

  constructor(
    private _Router: Router,
    private _ChatbotService: ChatBotService
  ) {
    this.interests = [
      { name: 'Business' },
      { name: 'Art, Design & Architecture' },
      { name: 'Law' },
      { name: 'Engineering' },
    ];
  }
  ngOnInit(): void {
    // this.userBudget(e:any);
  }

  f1() {
    
    this.studentInfo.fieldOfInterst = this.fieldOfInterst;
    if (!this.business) {
      this.business = true;
      this.selectedInterest.push('Business and management');
      this.fieldOfInterst.push(1);
      this.onClick();
    } else {
      this.fieldOfInterst = this.removeItemOnce(this.fieldOfInterst,1);
      this.business = false;
      const itemToRemove = 'Business and management';
      const indexToRemove = this.selectedInterest.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.selectedInterest.splice(indexToRemove, 1);
        this.onClick();
      }
    }
    console.log('Result:', this.business, this.selectedInterest);
  }

  f2() {
    
    this.studentInfo.fieldOfInterst = this.fieldOfInterst;

    if (!this.art) {
      this.art = true;
      this.selectedInterest.push('Art, Design and Architecture');
      this.fieldOfInterst.push(2);
      this.onClick();
    } else {
      this.fieldOfInterst = this.removeItemOnce(this.fieldOfInterst,2);
      this.art = false;
      const itemToRemove = 'Art, Design and Architecture';
      const indexToRemove = this.selectedInterest.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.selectedInterest.splice(indexToRemove, 1);
        this.onClick();
      }
    }
    console.log('Result:', this.art, this.selectedInterest);
  }

  f3() {
    
    this.studentInfo.fieldOfInterst = this.fieldOfInterst;

    if (!this.computer) {
      this.computer = true;
      this.selectedInterest.push('Computer science and IT');
      this.fieldOfInterst.push(3);
      this.onClick();
    } else {
      this.fieldOfInterst = this.removeItemOnce(this.fieldOfInterst,3);
      this.computer = false;
      const itemToRemove = 'Computer science and IT';
      const indexToRemove = this.selectedInterest.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.selectedInterest.splice(indexToRemove, 1);
        this.onClick();
      }
    }
    console.log('Result:', this.computer, this.selectedInterest);
  }

  f4() {
    
    this.studentInfo.fieldOfInterst = this.fieldOfInterst;

    if (!this.engineering) {
      this.engineering = true;
      this.selectedInterest.push('Engineering and technology');
      this.fieldOfInterst.push(4);
      this.onClick();
    } else {
      this.fieldOfInterst = this.removeItemOnce(this.fieldOfInterst,4);
      this.engineering = false;
      const itemToRemove = 'Engineering and technology';
      const indexToRemove = this.selectedInterest.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.selectedInterest.splice(indexToRemove, 1);
        this.onClick();
      }
    }
    console.log('Result:', this.engineering, this.selectedInterest);
  }

  f5() {
    
    this.studentInfo.fieldOfInterst = this.fieldOfInterst;

    if (!this.marketing) {
      this.marketing = true;
      this.selectedInterest.push('Marketing and communication');
      this.fieldOfInterst.push(5);
      this.onClick();
    } else {
      this.fieldOfInterst = this.removeItemOnce(this.fieldOfInterst,5);
      this.marketing = false;
      const itemToRemove = 'Marketing and communication';
      const indexToRemove = this.selectedInterest.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.selectedInterest.splice(indexToRemove, 1);
        this.onClick();
      }
    }
    console.log('Result:', this.marketing, this.selectedInterest);
  }
  f6() {
    
    this.studentInfo.fieldOfInterst = this.fieldOfInterst;

    if (!this.other) {
      this.other = true;
      this.selectedInterest.push('Others');
      this.fieldOfInterst.push(6);
      this.onClick();
    } else {
      this.fieldOfInterst = this.removeItemOnce(this.fieldOfInterst,6);
      this.other = false;
      const itemToRemove = 'Others';
      const indexToRemove = this.selectedInterest.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.selectedInterest.splice(indexToRemove, 1);
        this.onClick();
      }
    }
    console.log('Result:', this.other, this.selectedInterest);
  }

  onClick() {
    this.profileInfo[1] = this.selectedInterest;
    this.chatData();
  }

  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  color = 0;
  getEduLevel(e: any) {
    let eduLevel = e.target.innerText;
    this.edu_grade =0;
    if (eduLevel == 'I am in high school') {
      this.color = 1;
      this.isSchool = true;
      this.isUniversity = false;
      this.graduated = false;
      this.education_level = 1;
      this.profileInfo[0] = { eduLevel };
      this.chatData();
    }
    if (eduLevel == 'I am in University') {
      this.color = 2;
      this.isSchool = false;
      this.graduated = false;
      this.isUniversity = true;
      this.education_level = 2;
      this.profileInfo[0] = { eduLevel };
      this.chatData();
    }
    if (eduLevel == 'I have graduated') {
      this.color = 3;
      this.isSchool = false;
      this.graduated = true;
      this.isUniversity = false;
      this.education_level = 3;
      this.profileInfo[0] = { eduLevel };
      this.chatData();
    }
    this.studentInfo.education_level = this.education_level;
  }
  edu_grade = 0;
  gradeColor = 0;
  getGrade(e: any) {
    let grade = e.target.innerText;
    switch(grade) {
      case '11th grade':
        this.edu_grade = 1;
        break;
      case '12th grade':
        this.edu_grade = 2;
        break;
      case 'First year':
        this.edu_grade = 1;
        break;
      case 'Second year':
        this.edu_grade = 2
        break;
      case 'Third year':
        this.edu_grade = 3;
        break;
      case 'Forth year':
        this.edu_grade = 4;
        break;
      case 'High School / Baccalaureate':
        this.edu_grade = 1;
        break;
      case "DUT / BTS / Preparatory classes":
        this.edu_grade = 2;
        break;
      case "Bachelor (3 years)":
        this.edu_grade = 3;
        break;
      case 'Bachelor (4 years)':
        this.edu_grade = 4;
        break;
      case "Master 1":
        this.edu_grade = 6;
        break;
      case "Master 2":
        this.edu_grade = 7;
        break;
      case 'Above':
        this.edu_grade =5
        break;
    }

    this.studentInfo.grade = this.edu_grade;
    this.profileInfo[0] = { ...this.profileInfo[0], grade };
    this.chatData();
    this.fieldsStep = true;
    this.stepC = true;
  }

  chatData() {
    this.profileData.emit(this.profileInfo);
  }
  // general Qs
  getlang(e: any) {
    let lang = e.target.innerText;
    this.proficiency_english = 0;
    this.english_test = 0;
    this.proficiency_french = 0;
    this.french_test = 0;
    if (lang === 'English') {
      this.language_preference = 1;
      this.englishlang = true;
      this.frenchlang = false;
      this.totlang = false;
      this.profileInfo[2] = { lang };
      this.chatData();
      this.stepD = false;
    }
    if (lang === 'French') {
      this.language_preference = 2;
      this.englishlang = false;
      this.frenchlang = true;
      this.totlang = false;
      this.profileInfo[2] = { lang };
      this.chatData();
      this.stepD = false;
    }
    if (lang === 'Open to both') {
      this.language_preference = 3;
      this.englishlang = true;
      this.frenchlang = true;
      this.totlang = true;
      this.profileInfo[2] = { lang };
      this.chatData();
      this.stepD = true;
    }

    this.studentInfo.language_preference = this.language_preference;
  }
  // english
  qteseE(e: any) {
    let answer = e.target.innerText;
    this.english_test = 0;
    if (answer === 'Yes, I have') {
      this.proficiency_english = 1;
      this.yeshave = true;
      this.profileInfo[5] = { ...this.profileInfo[5], answer };
      this.chatData();
      this.stepD = false;
    }
    if (answer === 'I am planning to take one') {
      this.proficiency_english = 2;
      this.yeshave = false;
      this.ilets = false;
      this.toefl = false;
      this.duolong = false;
      this.easy = false;
      this.profileInfo[5] = { ...this.profileInfo[5], answer };
      this.chatData();
      this.stepD = true;
    }
    if (answer === "I don't have a test") {
      this.proficiency_english = 3;
      this.yeshave = false;
      this.ilets = false;
      this.toefl = false;
      this.duolong = false;
      this.easy = false;
      this.profileInfo[5] = { ...this.profileInfo[5], answer };
      this.chatData();
      this.stepD = true;
    }

    this.studentInfo.proficiency_english = this.proficiency_english;

  }

  optiontest(e: any) {
    let option = e.target.innerText;
    if (option === 'IELTS') {
      this.english_test = 1;
      this.ilets = true;
      this.toefl = false;
      this.duolong = false;
      this.easy = false;
      this.profileInfo[5] = { ...this.profileInfo[5], option };
      this.chatData();
      this.stepScore = true;
    }
    if (option === 'TOEFL') {
      this.english_test = 2;
      this.ilets = false;
      this.toefl = true;
      this.duolong = false;
      this.easy = false;
      this.profileInfo[5] = { ...this.profileInfo[5], option };
      this.chatData();
      this.stepScore = true;
    }
    if (option === 'Duolingo') {
      this.english_test = 3;
      this.ilets = false;
      this.toefl = false;
      this.duolong = true;
      this.easy = false;
      this.profileInfo[5] = { ...this.profileInfo[5], option };
      this.chatData();
      this.stepScore = true;
    }
    if (option === 'Easy speaking') {
      this.english_test = 4;
      this.ilets = false;
      this.toefl = false;
      this.duolong = false;
      this.easy = true;
      this.profileInfo[5] = { ...this.profileInfo[5], option };
      this.chatData();
      this.stepScore = true;
    }
    this.studentInfo.english_test = this.english_test;

  }

  scoreL(e: any) {
    let sc = e.target.value;
    this.studentInfo.eng_testScore = sc;
    this.profileInfo[5] = { ...this.profileInfo[5], sc };
    this.chatData();
  }
  // french
  qteseF(e: any) {
    let answer = e.target.innerText;
    this.french_test = 0;
    if (answer === 'Yes, I have') {
      this.proficiency_french = 1;
      this.yeshave1 = true;
      this.profileInfo[6] = { ...this.profileInfo[6], answer };
      this.chatData();
    }
    if (answer === 'I am planning to take one') {
      this.proficiency_french = 2;
      this.yeshave1 = false;
      this.scoreF = false;
      this.profileInfo[6] = { ...this.profileInfo[6], answer };
      this.chatData();
      this.stepD = true;
    }
    if (answer === "I don't have a test") {
      this.proficiency_french = 3;
      this.yeshave1 = false;
      this.scoreF = false;
      this.profileInfo[6] = { ...this.profileInfo[6], answer };
      this.chatData();
      this.stepD = true;
    }
    this.studentInfo.proficiency_french = this.proficiency_french;
  }

  optiontest1(e: any) {
    let option = e.target.innerText;
    switch(option){
      case 'DELF':
        this.french_test = 1;
        break;
      case 'DALF':
        this.french_test = 2;
        break;
      case 'TCF':
        this.french_test = 3;
        break;
    }
    this.studentInfo.french_test = this.french_test;
    this.profileInfo[6] = { ...this.profileInfo[6], option };
    this.chatData();
    this.scoreF = true;
    this.stepScore = true;
  }

  scoref(e: any) {
    let sc = e.target.innerText;
    this.studentInfo.fr_testScore = sc;
    this.profileInfo[6] = { ...this.profileInfo[6], sc };
    this.chatData();
  }

  onFieldsChange(e: Event): void {
    this.otherInterst = (e.target as HTMLInputElement).value;
    console.log(this.otherInterst);

    this.profileInfo[4] = { otherInterst: this.otherInterst };
    this.chatData();
  }

  userBudget(e: any) {
    let budget = e.target.value;
    if(budget>100000){
      this.profileInfo[3] = { min: 100000 };
      this.studentInfo.budget = 100000;
    }
    else if(budget<5000){
      this.profileInfo[3] = { min: 5000 };
      this.studentInfo.budget = 5000;
    }
    else{
      this.profileInfo[3] = { min: budget };
      this.studentInfo.budget = budget;
    }

    // this.profileInfo[3] = { ...this.profileInfo[3], max: this.maxValue };
    this.chatData();
  }
  budgetLimit:any;
  limit(e: any) {
    let budget = e.target.value;
    if(budget>100000){
      this.profileInfo[3] = { min: 100000 };
      this.studentInfo.budget = 100000;
      this.budgetLimit = 100000
    }
    else if(budget<5000){
      this.profileInfo[3] = { min: 5000 };
      this.studentInfo.budget = 5000;
      this.budgetLimit = 5000
    }
    else{
      this.profileInfo[3] = { min: budget };
      this.studentInfo.budget = budget;
      this.budgetLimit = budget
    }

    // this.profileInfo[3] = { ...this.profileInfo[3], max: this.maxValue };
    this.chatData();
  }
  onUserChangeBudget(changeContext: ChangeContext): void {
    this.profileInfo[3].min = changeContext.value;
    this.profileInfo[3].max = changeContext.highValue;
    this.chatData();
  }

  @ViewChild('education') education!: ElementRef;
  @ViewChild('language') language!: ElementRef;
  @ViewChild('budget') budget!: ElementRef;
  @ViewChild('backone') backone!: ElementRef;

  step1() {
    this.eduStep = true;
    this.stepA = false;
    this.stepB = false;
    this.showIcon = true;
    this.progressCount.emit('40%');
    this.progressWidth.emit('40');
    this.imgHeight = 16;
  }

  step2() {
    if (this.profileInfo[0] !== undefined) {
      this.fieldsStep = true;
      this.stepB = false;
      this.stepC = true;
      this.progressCount.emit('60%');
      this.progressWidth.emit('60');
      this.imgHeight = 26;
      // this.language.nativeElement.style.display = 'block'
    }
  }

  step3() {
    if (this.profileInfo[1] !== undefined) {
      this.langStep = true;
      this.stepC = false;
      this.stepD = false;
      this.stepScore = true;
      this.progressCount.emit('40%');
      this.progressWidth.emit('40');
      this.imgHeight = 57;
      this.education.nativeElement.style.display = 'none';
      this.language.nativeElement.style.display = 'block';
    }
  }

  step4() {
    if (this.profileInfo[2] !== undefined) {
      this.budgetStep = true;
      this.stepD = false;
      this.stepE = true;
      this.stepScore = false;
      this.lastStep = false;
      this.progressCount.emit('80%');
      this.progressWidth.emit('80');
      this.imgHeight = 95;
      this.language.nativeElement.style.display = 'none';
    }
  }
  steps() {
    if (this.profileInfo[2]?.lang === 'English') {
      if (
        this.profileInfo[5]?.sc !== undefined ||
        this.profileInfo[5].answer === 'I am planning to take one' ||
        this.profileInfo[5].answer === "I don't have a test"
      ) {
        this.budgetStep = true;
        this.stepD = false;
        this.stepE = true;
        this.stepScore = false;
        this.lastStep = false;
        this.progressCount.emit('80%');
        this.progressWidth.emit('80');
        this.imgHeight = 95;
        this.language.nativeElement.style.display = 'none';
        this.budget.nativeElement.style.display = 'block';
        console.log(this.profileInfo);
      }
    }
    if (this.profileInfo[2]?.lang === 'French') {
      if (
        this.profileInfo[6]?.sc !== undefined ||
        this.profileInfo[6].answer === 'I am planning to take one' ||
        this.profileInfo[6].answer === "I don't have a test"
      ) {
        this.budgetStep = true;
        this.stepD = false;
        this.stepE = true;
        this.stepScore = false;
        this.lastStep = false;
        this.progressCount.emit('80%');
        this.progressWidth.emit('80');
        this.imgHeight = 95;
        this.language.nativeElement.style.display = 'none';
        this.budget.nativeElement.style.display = 'block';
        console.log(this.profileInfo);
      }
    }
    if (this.profileInfo[2]?.lang === 'Open to both') {
      if (
        this.profileInfo[5]?.answer !== undefined &&
        this.profileInfo[6]?.answer !== undefined
      ) {
        this.budgetStep = true;
        this.stepD = false;
        this.stepE = true;
        this.stepScore = false;
        this.lastStep = false;
        this.progressCount.emit('80%');
        this.progressWidth.emit('80');
        this.imgHeight = 95;
        this.language.nativeElement.style.display = 'none';
        this.budget.nativeElement.style.display = 'block';
        console.log(this.profileInfo);
      }
    }
  }
  back() {
    this.language.nativeElement.style.display = 'none';
    // this.backone.nativeElement.style.display = 'none'
    this.education.nativeElement.style.display = 'block';
    this.stepScore = false;
    this.stepC = true;
    this.stepD = false;
  }
  step5() {
    if (this.profileInfo[3] !== undefined) {
      this.budgetStep = true;
      this.stepD = false;
      this.stepE = false;
      this.stepScore = false;
      this.lastStep = true;
      this.progressCount.emit('100%');
      this.progressWidth.emit('100');
      this.imgHeight = 95;
    }
    console.log(this.profileInfo);
  }
  back1() {
    this.budget.nativeElement.style.display = 'none';
    this.language.nativeElement.style.display = 'block';
    this.stepE = false;
    this.stepScore = true;
  }

  redirectToProfile() {
    const name = String(localStorage.getItem('userName'));
    console.log(this.profileInfo, typeof this.profileInfo, name);
    const profileName = String(localStorage.getItem('name'));
    const convertedArr = JSON.stringify(this.profileInfo).replace(/&/g, 'and');
    this._ChatbotService.sendData(this.studentInfo, name).subscribe((data) => {
      // if (data['status'] == 201 || data['status'] == 203) {
      this._Router.navigate(['/profile', 'documents']);
      // }
    });
    // if (
    //   this.profileInfo[0] &&
    //   this.profileInfo[1] &&
    //   this.profileInfo[2] &&
    //   this.profileInfo[3] !== undefined
    // ) {

    // }
  }
  redirectToPrgrams() {
    const name = String(localStorage.getItem('userName'));
    const convertedArr = JSON.stringify(this.profileInfo).replace(/&/g, 'and');
    this._ChatbotService.sendData(this.studentInfo, name).subscribe((data) => {
      if (data['status'] == 201 || data['status'] == 200) {
        this._Router.navigate(['/landing/programs']);
      }
    });
    // if (
    //   this.profileInfo[0] &&
    //   this.profileInfo[1] &&
    //   this.profileInfo[2] &&
    //   this.profileInfo[3] !== undefined
    // ) {

    // }
  }
}

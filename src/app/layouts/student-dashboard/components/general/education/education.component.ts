import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EducationComponent implements OnInit {
  // values!: string[];

  fullName: string;
  defaultField: string = "J'ai obtenu mon diplôme";
  educationStatuss: string[] = [
    "J'ai obtenu mon diplôme",
    'Je suis encore au lycée',
  ];

  countries!: any;
  searchCountry: string = '';
  countryName: string = "Pays d'enseignement";

  levelName!: string;
  levels: string[] = ['Premier cycle', 'Troisième cycle'];

  gradeName!: string;
  grades: string[] = [
    'Bachelor Year 1',
    'Bachelor Year 2',
    'Bachelor Year 3',
    'Bachelor Year 4',
    'Bachelor Year 5',
  ];

  addOther: boolean = false;
  maxInputs: number = 10;
  otherInterests: string[] = [];

  englishStatus: string[] = [
    "Oui, je l'ai fait",
    'Je le transmettrai',
    "Je n'ai pas de test",
  ];
  frenchScores: string[] = ['B1', 'B2', 'C1', 'C2'];

  engScores: object[] = [];
  frenScores: object[] = [];

  // engScores: any
  // frenScores: any

  // Chips Input
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fields: string[] = [];

  // Form
  stepTwoForm!: FormGroup;
  statuswanted!: string;
  levelwanted!: string;
  englishstatuswanted!: any;
  englishwanted!: string;
  frenchwanted!: string;
  constructor(
    private _StudentsService: StudentsService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.fullName = String(localStorage.getItem('name'));
    // To get default country if there's any
    this.countryName = String(localStorage.getItem('nationality'));
    // To get all countries and cities
    this.getAllCountries();
    // To Initialize the form
    this.stepTwoForm = this._FormBuilder.group({
      status: ['I have graduated', Validators.required],
      interests: new FormArray([], Validators.required),
      // english: ['I don’t have a test', Validators.required],
      english: ['I don’t have a test', Validators.required],
      french: ['I don’t have a test', Validators.required],
    });
  }

  ngOnInit(): void {
    this._StudentsService
      .profile(String(localStorage.getItem('userEmail')))
      .subscribe((data: any) => {
        console.log(data);

        const [
          {
            data: [
              {
                countrywanted,
                educationStatus,
                educationLevel,
                studentDegree,
                fieldOfInterests,
                studentEngTest,
                studentFrenchTest,
                engTest,
              },
            ],
          },
        ] = data;
        this.countryName = countrywanted;
        this.statuswanted = educationStatus;
        this.levelName = educationLevel;
        this.gradeName = studentDegree;
        this.englishwanted = studentEngTest;
        this.frenchwanted = studentFrenchTest;
        this.englishstatuswanted = engTest;
      });
    if (
      (this._ActivatedRoute.snapshot.queryParams['step'] == 2 &&
        this._ActivatedRoute.snapshot.fragment == 'level-of-education') ||
      this._ActivatedRoute.snapshot.queryParams['step'] == 2
    ) {
      window.scrollTo(0, 390);
    } else if (
      (this._ActivatedRoute.snapshot.queryParams['step'] == 2 &&
        this._ActivatedRoute.snapshot.fragment == 'field-interested') ||
      this._ActivatedRoute.snapshot.queryParams['step'] == 2
    ) {
      window.scrollTo(0, 1150);
    }
  }

  // To get the array of checked labels
  onCheckLabel(interest: string) {
    const form = <FormArray>this.stepTwoForm.get('interests');
    const control = new FormControl(interest);
    console.log(interest);

    if (form.value.includes(interest)) {
      const index = form.value.indexOf(interest);
      this.maxInputs++;
      form.removeAt(index);
    } else {
      this.maxInputs--;
      if (this.otherInterests.length > this.maxInputs) {
        form.controls.pop();
        this.otherInterests.pop();
      }
      form.push(control);
    }
    if (interest === 'Other' && form.value.includes(interest)) {
      this.addOther = !this.addOther;
      const index = form.value.indexOf(interest);
      form.removeAt(index);

      if (this.addOther === false) {
        this.maxInputs = 11 - form.controls.length;
        const index = form.value.indexOf(interest);
        form.removeAt(index);
        form.controls = form.controls.filter((control) => {
          return !this.otherInterests.includes(control.value);
        });
        this.otherInterests = [];
      } else {
        const num = 11 - form.controls.length;
        this.maxInputs = num;
      }
    }
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
    });
  }

  // To show the selected string
  changeSelection(e: any, identifier: string) {
    if (identifier === 'country') {
      this.searchCountry = '';
      this.countryName = e.target.innerText;
    }
    if (identifier === 'level') {
      this.levelName = e.target.innerText;

      if (this.levelName === 'Postgraduate')
        this.grades = ['Master Year 1', 'Master Year2', 'MBA'];
      if (this.levelName === 'High school')
        this.grades = ['Grade 11', 'Grade 12'];
    }
    if (identifier === 'grade') this.gradeName = e.target.innerText;
  }

  // To reset country selection
  removeCountry() {
    this.countryName = 'Pays d\'études';
  }

  // To change grades if I'm still studying option is selected
  changeGrades(e: any) {
    if (e.value === 'I am still in High school') {
      this.levelName = 'school level';
      this.gradeName = 'Grade';
      this.levels = ['High school'];
      this.grades = ['Grade 11', 'Grade 12'];
    } else {
      this.levelName = 'Education level';
      this.gradeName = 'Degree';
      this.levels = ['Undergraduate', 'Postgraduate'];
      this.grades = [
        'Bachelor Year 1',
        'Bachelor Year 2',
        'Bachelor Year 3',
        'Bachelor Year 4',
      ];
    }
  }

  // To add a chip from field of interests
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add
    if (
      value &&
      !this.otherInterests.includes(value) &&
      this.otherInterests.length < this.maxInputs
    ) {
      const form = <FormArray>this.stepTwoForm.get('interests');
      const control = new FormControl(value);
      form.push(control);
      this.otherInterests.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // To remove a chip from field of interests
  remove(interest: string): void {
    const index = this.otherInterests.indexOf(interest);
    const form = <FormArray>this.stepTwoForm.get('interests');

    const formIndex = form.value.indexOf(interest);
    form.removeAt(formIndex);

    if (index >= 0) {
      this.otherInterests.splice(index, 1);
    }
  }

  addTest(identifier: string, test: string) {
    // const form = <FormArray>this.stepTwoForm.get('englishTest');
    const obj: any = {};
    obj['lang'] = identifier;

    if (test === 'Eng') {
      const arr: any = [];
      this.engScores.forEach((object) => {
        arr.push(Object.values(object)[0]);
      });
      if (arr.includes(obj['lang'])) {
        const index = arr.indexOf(obj['lang']);
        this.engScores.splice(index, 1);
      } else {
        this.engScores.push(obj);
      }
    } else {
      const arr: any = [];
      this.frenScores.forEach((object) => {
        arr.push(Object.values(object)[0]);
      });
      if (arr.includes(obj['lang'])) {
        const index = arr.indexOf(obj['lang']);
        this.frenScores.splice(index, 1);
      } else {
        this.frenScores.push(obj);
      }
    }
  }

  addScore(identifier: string, test: string, e: any) {
    if (test === 'Eng') {
      const obj: object = this.engScores.filter((object: any) => {
        return object['lang'] === identifier;
      })[0];
      const newObj = { ...obj, score: +e.target.value };
      let index = 0;
      this.engScores = this.engScores.filter((object: any) => {
        if (object['lang'] === identifier)
          index = this.engScores.indexOf(object);
        return object['lang'] !== identifier;
      });
      this.engScores.splice(index, 0, newObj);
    }
  }

  changeScore(identifier: string, score: string) {
    const obj: object = this.frenScores.filter((object: any) => {
      return object['lang'] === identifier;
    })[0];
    const newObj = { ...obj, score: score };
    let index = 0;
    this.frenScores = this.frenScores.filter((object: any) => {
      if (object['lang'] === identifier)
        index = this.frenScores.indexOf(object);
      return object['lang'] !== identifier;
    });
    this.frenScores.splice(index, 0, newObj);
  }

  // To submit the form
  onSubmit(formData: FormGroup) {
    const userEmail = String(localStorage.getItem('userEmail'));
    const userName = String(localStorage.getItem('userName'));
    console.log(formData.value);

    const country = this.countryName;

    const level =
      this.levelName === 'Education level' ? 'None' : this.levelName;

    const grade = this.gradeName === 'Degree' ? 'None' : this.gradeName;

    console.log(this.engScores, this.frenScores);

    const englishScores = JSON.stringify(this.engScores);
    const frenchScores = JSON.stringify(this.frenScores);

    console.log(englishScores, frenchScores);

    const { status, interests, english, french } = formData.value;

    this._StudentsService
      .secondStep(
        userEmail,
        userName,
        status,
        country,
        level,
        grade,
        interests,
        english,
        englishScores,
        french,
        frenchScores
      )
      .subscribe(() => {
        console.log(interests);

        this._Router.navigate(
          [
            '/students',
            String(localStorage.getItem('name')),
            'general',
            'additional-information',
          ],
          { queryParams: { step: '3' }, fragment: 'study-in-france' }
        );
      });
  }
}

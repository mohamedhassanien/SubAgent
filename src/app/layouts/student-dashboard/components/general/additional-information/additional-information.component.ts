import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdditionalInformationComponent implements OnInit {
  fullName: string;
  wantedLang!: string;
  thirdStep!: FormGroup;
  vipservice!: string;

  minValue: number = 4000;
  maxValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 25000,
  };

  studyInterests: string[] = ['Anglais', 'Francais', 'Les deux'];
  vipser: string[] = ['Yes', 'No'];

  constructor(
    private _FormBuilder: FormBuilder,
    private _StudentsService: StudentsService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.fullName = String(localStorage.getItem('name'));

    // To get profile Info
    this.getProfileInfo();

    // To initiate thirdStep form
    this.thirdStep = this._FormBuilder.group({
      language: [this.wantedLang ? this.wantedLang : '', Validators.required],
      vip: [this.vipservice ? this.vipservice : '', Validators.required],
    });
  }

  ngOnInit(): void {
    if (
      this._ActivatedRoute.snapshot.fragment == 'study-in-france' &&
      this._ActivatedRoute.snapshot.queryParams['step'] == 3
    ) {
      window.scrollTo(0, 520);
    }
  }

  getProfileInfo() {
    const userEmail = String(localStorage.getItem('userEmail'));

    this._StudentsService.profile(userEmail).subscribe((data: any) => {
      const [
        {
          data: [
            {
              budget: [min, max],
              wantedStudeyLang,
              vip
            },
          ],
        },
      ] = data;

      if (min) {
        // To assing min value
        this.minValue = min;
      } else {
        this.minValue;
      }

      if (max) {
        // To assing min value
        this.maxValue = max;
      } else {
        this.maxValue;
      }
      // To assing wanted language
      this.wantedLang = wantedStudeyLang;
      this.vipservice = vip
    });
  }

  // To submit the form
  onSubmit(formData: FormGroup) {
    const { language } = formData.value;
    const { vip } = formData.value;
    
    const minValue = this.minValue;
    const maxValue = this.maxValue;
    const userEmail = String(localStorage.getItem('userEmail'));
    const userName = String(localStorage.getItem('userName'));

    this._StudentsService
      .thirdStep(userEmail, userName, language, minValue, maxValue, vip)
      .subscribe(() => {
        this._Router.navigate([
          '/students',
          String(localStorage.getItem('name')),
          'edit-profile'
        ]);
      });
  }
}

import { ActivatedRoute } from '@angular/router';
import { Student } from './../../../../../shared/models/student';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from './../../../../../shared/services/students/students.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-archived-profile',
  templateUrl: './archived-profile.component.html',
  styleUrls: ['./archived-profile.component.scss'],
})
export class ArchivedProfileComponent implements OnInit {
  showPassword = false;
  settingForm!: FormGroup;
  email!: string;
  city!: string;
  img!: string;
  name!: string;
  phone!: string;
  nationality!: string;
  languageTest!: string;
  profileData!: any;
  studentData!: any;
  programName!: string;
  schoolName!: string;
  empId!: string;
  // Documents
  CV!: string;
  ML!: string;
  Pass!: string;
  RL!: string;
  PH!: string;
  Trans!: string;
  LC!: string;
  @Input() componentName!: string;

  constructor(
    private actRoute: ActivatedRoute,
    private studServ: StudentsService,
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private http: HttpClient
  ) {
    this.settingForm = formBuilder.group({
      img: [''],
      name: [''],
      city: [''],
      email: [''],
      passport: [''],
      cv: [''],
      phone: [''],
      nationality: [''],
      ml: [''],
      pass: [''],
      rl: [''],
      trans: [''],
      lc: [''],
      status: [''],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {
    // router link parameters
    // passed from parent componant
    this.actRoute.params.subscribe((params) => {
      this.programName = params.progName;
      this.schoolName = params.schoolName;
      // student email
      this.email = params.email;
      this.city = params.city;
    });

    // get student's profile by pass student's email to API
    // (get student's email from the link's params)
    this.studServ.profile(this.email).subscribe((data: any) => {
      this.profileData = [
        this.name,
        ,
        ,
        ,
        ,
        this.nationality,
        this.languageTest,
        this.city,
        ,
        ,
        ,
        ,
        this.phone,
        ,
        this.CV,
        this.ML,
        this.Pass,
        this.RL,
        this.PH,
        this.Trans,
        this.LC,
      ] = data[0];
    });
  }
}

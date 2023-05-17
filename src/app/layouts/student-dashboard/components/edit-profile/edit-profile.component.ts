import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profilePicture!: string;
  fileSelected!: File | undefined;
  currentImage!: Upload;
  imageUrl!: string;
  errorMsg!: string;
  // Selection Form
  editForm!: FormGroup;

  countries!: any;
  searchCountry: string = '';
  countryName: string = 'Select country';

  cities!: any;
  searchCity: string = '';
  cityName: string = 'Select city';

  bio!: string;
  university!: string;
  faculty!: string;
  birthDate!: string;
  jobTitle!: string;

  loadingPic: boolean = false;
  msg!: string;

  fullName!:string


  constructor(
    private _StudentsService: StudentsService,
    private _FormBuilder: FormBuilder,
    private _UploadService: UploadService,
    private _Router:Router
  ) {
    // To get user Info
    this.getProfileInfo();
    // To get all countries and cities
    this.getAllCountries();

    this.editForm = this._FormBuilder.group({
      university: [
        this.university ? this.university : '',
        [Validators.required],
      ],
      faculty: [this.faculty ? this.faculty : '', [Validators.required]],
      jobTitle: [this.jobTitle ? this.jobTitle : '', [Validators.required]],
      birthDate: [this.birthDate ? this.birthDate : '', [Validators.required]],
      bio: [this.bio ? this.bio : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.fullName = String(localStorage.getItem('name'));
  }

  // To choose an image
  chooseImage(event: any): void {
    const file = <File>event.target.files[0];
    if (file === undefined) {
      this.errorMsg = 'Please Choose a File First!';
      this.fileSelected = undefined;
    } else {
      const fileName = file.name;
      const lastIndex = fileName.lastIndexOf('.');
      const fileExtension = fileName.slice(lastIndex + 1, fileName.length);
      if (
        fileExtension === 'png' ||
        fileExtension === 'jpg' ||
        fileExtension === 'jpeg'
      ) {
        this.fileSelected = file;
        this.uploadImage();
      } else {
        this.fileSelected = undefined;
        this.errorMsg = 'Please Select a suitable File..';
      }
    }
  }

  // Upload
  uploadImage(type?: string): void {
    const fileType = type ? type : '';

    if (this.fileSelected === undefined) {
      const userName = String(localStorage.getItem('userName'));
      const userEmail = String(localStorage.getItem('userEmail'));

      this.errorMsg = 'Please Choose a File First!';
      this._UploadService.imageAPI(userName, userEmail, this.profilePicture);
    } else {
      this.loadingPic = true;
      const file: File = this.fileSelected;
      this.currentImage = new Upload(file);
      this._UploadService.uploadFile(this.currentImage, fileType).subscribe(
        (percentage) => {
          if (percentage === 100) {
            setTimeout(() => {
              this.profilePicture = this.currentImage.url;
              if (fileType === 'image') this.getProfileInfo();
              this.loadingPic = false;
            }, 1000);
          }
        },
        () => {
          this.errorMsg = 'Something Went Wrong. Try again!';
        }
      );
    }
  }

  deleteImage() {
    this.profilePicture =
      'https://studentgator.com/assets/images/navbar/default-pic.svg';
    this.fileSelected = undefined;
  }

  getProfileInfo() {
    const userEmail = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(userEmail).subscribe((data: any) => {
      const [
        {
          data: [
            {
              profile_picture_url: picture,
              bio,
              job_title,
              location: { country, city },
              dateOfBirth,
              education: { university, faculty },
            },
          ],
        },
      ] = data;

      // To assign user Profile Picture
      this.profilePicture = picture;
      // To assign user Profile Picture
      this.jobTitle = job_title;
      // To assign user Profile Picture
      this.bio = bio;
      // // To assign user Profile Picture
      const date = dateOfBirth.split('-').reverse();
      const [year, month, day] = date;
      const newDate = [year, day, month].join('-');
      this.birthDate = newDate;
      // To assign user University
      this.university = university;
      // To assign user Faculty
      this.faculty = faculty;

      // To assign country
      if (country === '') {
        this.countryName = 'Select country';
      } else {
        this.countryName = country;
        this.getAllCities();
      }
      // To assign city
      city === '' ? (this.cityName = 'Select city') : (this.cityName = city);
    });
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
    });
  }

  // To get all cities of a countrt
  getAllCities() {
    const obj = this.countries.filter((obj: any) => {
      return obj.country === this.countryName;
    });
    const [{ cities }] = obj;
    this.cities = cities;
  }

  // To show the selected string
  changeSelection(e: any, identifier: string) {
    if (identifier === 'country') {
      this.searchCountry = '';
      this.countryName = e.target.innerText;
      this.getAllCities();
    }
    if (identifier === 'city') {
      this.searchCity = '';
      this.cityName = e.target.innerText;
    }
  }

  // To clear intial values of the form
  clearForm() {
    this.countryName = 'Select country';
    this.cityName = 'Select city';
    this.editForm.reset();
  }

  // To submit Form
  onSubmit(formData: any) {
    const userEmail = String(localStorage.getItem('userEmail'));
    const userName = String(localStorage.getItem('userName'));

    const country = this.countryName;
    const city = this.cityName;
    let { university, faculty, jobTitle, birthDate, bio } = formData.value;
    if (birthDate.split('-')[0].length > 2) {
      const date = birthDate.split('-').reverse();
      const [day, month, year] = date;
      const newDate = [month, day, year].join('-');
      birthDate = newDate;
      console.log(birthDate);
    }
    this._StudentsService
      .editInfo(
        userEmail,
        userName,
        country,
        city,
        jobTitle,
        birthDate,
        bio,
        faculty,
        university
      )
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.msg = 'Data Changed Successfully!';
        } else {
          this.msg = 'Something Went Wrong!';
        }
        setTimeout(() => (this.msg = ''), 1500);
      });
      this._Router.navigate([
        '/students',
        String(localStorage.getItem('name')),
        'profile',
        'myinfo',
      ]);
  }
}

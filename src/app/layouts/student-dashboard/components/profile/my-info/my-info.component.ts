import { Component, OnInit } from '@angular/core';

import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss'],
})
export class MyInfoComponent implements OnInit {
  // Variables
  profilePicture!: string;
  fullName!: string;
  jobRole!: string;
  country!: string;
  userBio!: string;
  userEmail!: string;
  minBudget!: number;
  maxBudget!: number;
  dateOfBirth!: string;
  city!: string;
  university!: string;
  faculty!: string;
  languageTest!: string;
  fieldsInterested: any[] = [];

  constructor(private _StudentsService: StudentsService) {
    // To call all profile info
    this.getProfileInfo();
  }

  ngOnInit(): void {}

  // To call all profile info
  getProfileInfo() {
    let email = String(localStorage.getItem('userEmail'));
    if (email) email = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(email).subscribe((data: any) => {
      
      const [
        {
          status,
          data: [
            {
              profile_picture_url: picture,
              name,
              bio,
              email,
              job_title,
              fieldOfInterests,
              education: { university, faculty },
              langtest,
              location: { country, city },
              budget: [minBudget, maxBudget],
              dateOfBirth,
            },
          ],
        },
      ] = data;

      console.log(data);

      if (status === 200) {
        this.profilePicture = picture;
        this.fullName = name;
        this.jobRole = job_title;
        this.country = country;
        this.userBio = bio;
        this.userEmail = email;
        this.fieldsInterested = fieldOfInterests;     
        // console.log(fieldOfInterests);
        
        this.minBudget = minBudget;
        this.maxBudget = maxBudget;
        this.dateOfBirth = dateOfBirth;
        this.city = city;
        this.university = university;
        this.faculty = faculty;
        this.languageTest = langtest;
        this.country = country
      }
    });
  }
}

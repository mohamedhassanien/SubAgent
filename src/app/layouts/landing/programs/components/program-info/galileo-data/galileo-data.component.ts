import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramsService } from '../../../services/programs.service';

@Component({
  selector: 'app-galileo-data',
  templateUrl: './galileo-data.component.html',
  styleUrls: ['./galileo-data.component.scss']
})
export class GalileoDataComponent implements OnInit {

  arr: any[] = []
  constructor(private formBuilder: FormBuilder, private _ProgramsService: ProgramsService) { }
 @Input() programIdChild:string | undefined

  registerationForm = this.formBuilder.group({
    IELTS: false,
    TOEFL: false,
    TCF: false,
    DELF: false,
    DALF: false,
    fName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    code: ['', [Validators.required]],
    city: ['', [Validators.required]],
    date: ['', [Validators.required]],
    country: ['', [Validators.required]],
    Nationality: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    CountryBirth: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
    CityBirth: ['', [Validators.required]],
    ParentsEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //acadimic data
    degree: ['', [Validators.required]],
    yearGraduated: ['', [Validators.required]],
    undergraduate: ['', [Validators.required]],
    Institution: ['', [Validators.required]],
    acadimicCity: ['', [Validators.required]],
    acadimicCountry: ['', [Validators.required]],
    //language data
    nativeLang: ['', [Validators.required]],
    level: ['', [Validators.required]],
    Niveau: ['', [Validators.required]],
    //ass data
    placedate: ['', [Validators.required]],
    sign1: ['', [Validators.required]],
    sign2: ['', [Validators.required]],
  })


  get userNameFeld() {
    return this.registerationForm.get('fName')
  }
  get useraddress() {
    return this.registerationForm.get('address')
  }
  get userIname() {
    return this.registerationForm.get('lName')
  }
  get usercode() {
    return this.registerationForm.get('code')
  }
  get usercity() {
    return this.registerationForm.get('city')
  }
  get userdate() {
    return this.registerationForm.get('date')
  }
  get usercountry() {
    return this.registerationForm.get('country')
  }
  get userNationality() {
    return this.registerationForm.get('Nationality')
  }
  get useremail() {
    return this.registerationForm.get('email')
  }
  get userCountryBirth() {
    return this.registerationForm.get('CountryBirth')
  }
  get userphone() {
    return this.registerationForm.get('phone')
  }
  get userCityBirth() {
    return this.registerationForm.get('CityBirth')
  }
  get parentEmail() {
    return this.registerationForm.get('ParentsEmail')
  }
  //acadimic data
  get acdegree() {
    return this.registerationForm.get('degree')
  }
  get acyearGraduated() {
    return this.registerationForm.get('yearGraduated')
  }
  get acundergraduate() {
    return this.registerationForm.get('undergraduate')
  }
  get acInstitution() {
    return this.registerationForm.get('Institution')
  }
  get acacadimicCity() {
    return this.registerationForm.get('acadimicCity')
  }
  get acacadimicCountry() {
    return this.registerationForm.get('acadimicCountry')
  }
  //language data
  get langnativeLang() {
    return this.registerationForm.get('nativeLang')
  }
  get langlevel() {
    return this.registerationForm.get('level')
  }
  get langNiveau() {
    return this.registerationForm.get('Niveau')
  }
  //ass data
  get assplacedate() {
    return this.registerationForm.get('placedate')
  }
  get asssign1() {
    return this.registerationForm.get('sign1')
  }
  get asssign2() {
    return this.registerationForm.get('sign2')
  }

  FinalGalileoData: any
  submit(formData: FormGroup) {
    let GalileoData = this.registerationForm.value
    GalileoData.programID = this.programIdChild
    this.FinalGalileoData = JSON.stringify(GalileoData)
    this.sendGalileoData()
  }

  sendGalileoData() {
    this._ProgramsService.postGalileoData(this.FinalGalileoData).subscribe()
  }

  ngOnInit(): void { 
  }

}

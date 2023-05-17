import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramsService } from '../../../services/programs.service';

@Component({
  selector: 'app-figs',
  templateUrl: './figs.component.html',
  styleUrls: ['./figs.component.scss']
})
export class FigsComponent implements OnInit {

  arr: any[] = []
  constructor(private formBuilder: FormBuilder, private _ProgramsService: ProgramsService) { }
  @Input() programIdChild: string | undefined

  registerationForm = this.formBuilder.group({
    BACHELOR1: false,
    BACHELOR2: false,
    BACHELOR3: false,
    MASTER1: false,
    MASTER2: false,
    university: ['', [Validators.required]],
    program: ['', [Validators.required]],
    rentree: ['', [Validators.required]],
    CAMPUS: ['', [Validators.required]],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    Nationality: ['', [Validators.required]],
    date: ['', [Validators.required]],
    birthPlace: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]],
    status: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    Adresse: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    tel: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    money: ['', [Validators.required]],
    sponserName: ['', [Validators.required]],
    //parents data(father)
    ffname: ['', [Validators.required]],
    fjob: ['', [Validators.required]],
    fcountry: ['', [Validators.required]],
    ftell: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    femail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //parents data(mother)
    mname: ['', [Validators.required]],
    mjob: ['', [Validators.required]],
    mcountry: ['', [Validators.required]],
    mtell: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    memail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //acadimic data
    ecole1: ['', [Validators.required]],
    pays1: ['', [Validators.required]],
    dip1: ['', [Validators.required]],
    date1: ['', [Validators.required]],
    ecole2: ['', [Validators.required]],
    pays2: ['', [Validators.required]],
    dip2: ['', [Validators.required]],
    date2: ['', [Validators.required]],
    //language data
    motherLanguage: ['', [Validators.required]],
    english1: ['', [Validators.required]],
    english2: ['', [Validators.required]],
    english3: ['', [Validators.required]],
    french1: ['', [Validators.required]],
    french2: ['', [Validators.required]],
    french3: ['', [Validators.required]],
    other1: ['', [Validators.required]],
    other2: ['', [Validators.required]],
    other3: ['', [Validators.required]],
    //experience data
    ent1: ['', [Validators.required]],
    mission1: ['', [Validators.required]],
    pay1: ['', [Validators.required]],
    dedate1: ['', [Validators.required]],
    ent2: ['', [Validators.required]],
    mission2: ['', [Validators.required]],
    pay2: ['', [Validators.required]],
    dedate2: ['', [Validators.required]],
    //ass data
    placedate: ['', [Validators.required]],
    sign: ['', [Validators.required]],
  })


  get university() {
    return this.registerationForm.get('university')
  }
  get program() {
    return this.registerationForm.get('program')
  }
  get fName() {
    return this.registerationForm.get('fName')
  }
  get lName() {
    return this.registerationForm.get('lName')
  }
  get userNationality() {
    return this.registerationForm.get('Nationality')
  }
  get userdate() {
    return this.registerationForm.get('date')
  }
  get userbirthPlace() {
    return this.registerationForm.get('birthPlace')
  }
  get userAge() {
    return this.registerationForm.get('age')
  }
  get usercity() {
    return this.registerationForm.get('city')
  }
  get usercountry() {
    return this.registerationForm.get('country')
  }
  get userAdresse() {
    return this.registerationForm.get('Adresse')
  }
  get useremail() {
    return this.registerationForm.get('email')
  }
  get usertel() {
    return this.registerationForm.get('tel')
  }

  //parents data(father)
  get fatherName() {
    return this.registerationForm.get('ffname')
  }
  get fatherJob() {
    return this.registerationForm.get('fjob')
  }
  get fatherCountry() {
    return this.registerationForm.get('fcountry')
  }
  get fatherTell() {
    return this.registerationForm.get('ftell')
  }
  get fatherEmail() {
    return this.registerationForm.get('femail')
  }
  //parents data(mother)
  get motherName() {
    return this.registerationForm.get('mname')
  }
  get motherJob() {
    return this.registerationForm.get('mjob')
  }
  get motherCountry() {
    return this.registerationForm.get('mcountry')
  }
  get motherTell() {
    return this.registerationForm.get('mtell')
  }
  get motherEmail() {
    return this.registerationForm.get('memail')
  }
  //language data
  get usermotherLanguage() {
    return this.registerationForm.get('motherLanguage')
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
  get asssign() {
    return this.registerationForm.get('sign')
  }


  FinalFigsData: any
  submit(formData: FormGroup) {
    console.log(this.registerationForm.value);
    // let FigsData = this.registerationForm.value
    // FigsData.programID = this.programIdChild
    // this.FinalFigsData = JSON.stringify(FigsData)
    // this.sendGalileoData()
  }

  sendGalileoData() {
    // this._ProgramsService.postFigsData(this.FinalFigsData).subscribe()
  }

  ngOnInit(): void {
  }

}

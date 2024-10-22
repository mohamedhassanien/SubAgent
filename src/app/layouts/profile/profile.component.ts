import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatBotService } from 'src/app/shared/services/chat-bot/chat-bot.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  interstFields!: string[];
  @ViewChild('welcome', { static: true }) welcome = {} as ElementRef;

  constructor(
    private _StudentsService: StudentsService,
    private _UploadService: UploadService,
    private _ModalService: NgbModal,
    private _Router: Router,
    private formBuilder: FormBuilder,
    private _ChatbotService: ChatBotService,
    private router: Router
  ) { }
  educationStatusOptions: string[] = [
    'Je suis au lycée',
    "Je suis à l'université",
    "J'ai obtenu mon diplôme",
  ];
  educationLevelOptions!: string[];
  englishlang: string[] = ['IELTS', 'TOEFL', 'Duolingo', 'Easy speaking'];
  englishScore!: string;
  frenchlang: string[] = ['DELF', 'DALF', 'TCF'];
  frenchScore: string[] = ['B1', 'B2', 'C1', 'C2'];

  empData: any[] = [];
  userName: string = '';
  engTest: string = '';
  frTest: string = '';
  empId: any = '';
  budget: any;
  repName: string = '';
  repNumber!: any;
  represntativefound: boolean = true;
  profilePicture!: string;
  fileSelected!: File | undefined;
  currentImage!: Upload;
  imageUrl!: string;
  errorMsg!: string;
  loadingPic: boolean = false;
  educationLevel: string = '';
  educationStatus!: string;
  englishtest!: string;
  frenchtest!: string;
  englishTestName!: string;
  frenchTestName!: string;
  englishTestScore!: string;
  frenchTestScore!: string;

  openMobile: boolean = false;
  openLang: boolean = false;
  openinter: boolean = false;
  openbudget: boolean = false;

  interests: any[] = [];
  educationForm!: FormGroup;
  languageForm!: FormGroup;
  interestsForm!: FormGroup;
  budgetForm!: FormGroup;


  ngOnInit(): void {

    if (localStorage.getItem('openwelcom') == 'true' || localStorage.getItem('openwelcom') == undefined && localStorage.getItem('FirstLogin') != '1') {
      this.openModal(this.welcome, 'welcome_modal', '', []);
      localStorage.setItem('openwelcom','false');
    } else {
      localStorage.setItem('openwelcom','false');
    }

    this.interstFields = [
      'Art, Design et Architecture',
      'Business et management',
      "Informatique et technologies de l'information",
      'Ingénierie et technologie',
      'Marketing et communication',
      'Autres',
    ];

    this.interestsForm = this.formBuilder.group({
      interstsarray: ['', [Validators.required]],
    });

    this.educationForm = this.formBuilder.group({
      edulevel: ['', [Validators.required]],
      edustatus: ['', [Validators.required]],
    });

    this.languageForm = this.formBuilder.group({
      englang: ['', [Validators.required]],
      frelang: ['', [Validators.required]],
      engscore: ['', [Validators.required]],
      frenchscore: ['', [Validators.required]],
    });

    this.budgetForm = this.formBuilder.group({
      budgetvalue: ['', [Validators.required, Validators.max(100000), Validators.min(5000)]],
    });
    this.getInformation();
  }

  // To confirm action
  confirmAction(
    message: string = 'Your work has been saved',
    button: boolean = false
  ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: button,
      timer: 750,
    });
  }

  // To confirm error
  errorAction(message: string = 'Something went wrong!') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  setEduLevelOpt(status: string) {
    if (status.toLowerCase().replace(/ /g, '') === 'iaminhighschool') {
      this.educationLevelOptions = ['3éme année lycée', 'Baccalauréat'];
    }
    if (status.toLowerCase().replace(/ /g, '') === 'iaminuniversity') {
      this.educationLevelOptions = [
        'Bachelor 1',
        'Bachelor 2',
        'Bachelor 3',
        'Master 1',
        'Master 2',
      ];
    }
    if (status.toLowerCase().replace(/ /g, '') === 'ihavegraduated') {
      this.educationLevelOptions = [
        'Baccalauréat',
        "Licence",
        'Master',
      ];
    }
  }

  setEnglishScoreLimits(type: string, testName: string): number {
    if (type === 'min') {
      if (testName === 'IELTS') {
        return 1;
      }
      if (testName === 'TOEFL') {
        return 0;
      }
      if (testName === 'Duolingo') {
        return 10;
      }
      if (testName === 'Easy speaking') {
        return 1;
      }
    } else {
      if (testName === 'IELTS') {
        return 9;
      }
      if (testName === 'TOEFL') {
        return 120;
      }
      if (testName === 'Duolingo') {
        return 160;
      }
      if (testName === 'Easy speaking') {
        return 100;
      }
    }
    return 0;
  }

  onSubmiteducation(FormGroup: any) {
    var edustatus;
    switch(FormGroup.value.edustatus){
      case 'Je suis au lycée':
        edustatus = 1;
        break;
      case "Je suis à l'université":
        edustatus = 2;
        break;
      case "J'ai obtenu mon diplôme":
        edustatus = 3;
        break;
    }
    var edulevel;
    switch(FormGroup.value.edulevel){
      case '3éme année lycée':
        edulevel = 1;
        break;
      case 'Baccalauréat':
        edulevel = 2;
        break;
      case 'Bachelor 1':
        edulevel = 1;
        break;
      case 'Bachelor 2':
        edulevel = 2
        break;
      case 'Bachelor 3':
        edulevel = 3;
        break;
      case 'Master 1':
        edulevel = 4;
        break;
      case 'Je suis au lycée':
        edulevel = 1;
        break;
      case "Je suis à l'université":
        edulevel = 2;
        break;
      case "Diplôme de Master":
        edulevel = 3;
        break;
      case 'Au dessus':
        edulevel = 5
        break;
    }
    this._ChatbotService
      .updatePreference(
        edustatus,
        edulevel,
        '',
        '',
        '',
        '',
        '',
        ''
      )
      .subscribe((data: any) => {
        this.educationLevel = FormGroup.value.edulevel;
        this.educationStatus = FormGroup.value.edustatus;
        if (data.status === 201) {
          this._ModalService.dismissAll();
          this.confirmAction(data.message);
        } else {
          this.errorAction();
        }
      });
    this.showMobile();
  }

  onSubmitlang(FormGroup: any) {
    console.log(FormGroup.value);
    var engtest;
    switch(FormGroup.value.englang){
      case 'IELTS':
        engtest = 1;
        break;
      case 'TOEFL':
        engtest = 2;
        break;
      case 'Duolingo':
        engtest = 3;
        break;
      case 'Easy speaking':
        engtest = 4;
        break;
    }

    var frctest;
    switch(FormGroup.value.frelang){
      case 'DELF':
        frctest = 1;
        break;
      case 'DALF':
        frctest = 2;
        break;
      case 'TCF':
        frctest = 3;
        break;
    }
    this._ChatbotService
      .updatePreference(
        '',
        '',
        frctest,
        FormGroup.value.frenchscore,
        engtest,
        FormGroup.value.engscore,
        '',
        ''
      )
      .subscribe((data: any) => {
        this.frenchTestName = FormGroup.value.frelang;
        this.frenchTestScore = FormGroup.value.frenchscore;
        this.englishTestName = FormGroup.value.englang;
        this.englishTestScore = FormGroup.value.engscore;
        if (data.status === 201) {
          this.confirmAction(data.message);
        } else {
          this.errorAction();
        }
      });
    this.showLang();
  }

  onSubmiterests(FormGroup: any) {
    var foi:number[] = [];
    const int = FormGroup.value.interstsarray
    for (let i in int) {
      switch(int[i]){
        case 'Art, Design et Architecture':
          foi.push(1) ;
          break;
        case 'Business et management':
          foi.push(2) ;
          break;
        case "Informatique et technologies de l'information":
          foi.push(3) ;
          break;
        case 'Ingénierie et technologie':
          foi.push(4) ;
          break;
        case 'Marketing et communication':
          foi.push(5) ;
          break;
        case 'Autres':
          foi.push(6) ;
          break;
      }
    }

    this._ChatbotService
      .updatePreference(
        '',
        '',
        '',
        '',
        '',
        '',
        foi.toString(),
        ''
      )
      .subscribe((data: any) => {
        this.interests = FormGroup.value.interstsarray;
        if (data.status == 201) {
          this.confirmAction(data.message);
          this.getInformation();
        } else {
          this.errorAction();
        }
      });
    this.showinter();
  }

  onSubmitbudget(FormGroup: any) {
    console.log(FormGroup.value.budgetvalue);
    this._ChatbotService
      .updatePreference('', '', '', '', '', '', '', FormGroup.value.budgetvalue)
      .subscribe((data: any) => {
        this.budget = FormGroup.value.budgetvalue;
        if (data.status === 201) {
          this.confirmAction(data.message);
        } else {
          this.errorAction();
        }
      });
    this.showbudget();
  }

  getInformation() {
    let email = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(email).subscribe((res: any) => {
      console.log(res);
      const [
        {
          data: [
            {
              name,
              fieldOfInterests,
              engTestsTypeAndScore,
              frenchTestsTypeAndScore,
              empid,
              budget,
              profile_picture_url: picture,
              educationLevel,
              educationStatus,
            },
          ],
        },
      ] = res;
      this.userName =
        name[0].toUpperCase() + name.substr(1).toLowerCase().replace('/', ' ');
      this.interests = fieldOfInterests;
      this.empId = empid;
      this.budget = budget;
      this.profilePicture = picture;
      this.educationLevel = educationLevel;
      this.educationStatus = educationStatus;
      if (frenchTestsTypeAndScore != null) {
        this.frenchTestName = frenchTestsTypeAndScore[0].name;
        this.frenchTestScore = frenchTestsTypeAndScore[0].score;
      }
      if (engTestsTypeAndScore != null) {
        this.englishTestName = engTestsTypeAndScore[0].name;
        this.englishTestScore = engTestsTypeAndScore[0].score;
      }

      this.interestsForm.controls['interstsarray'].setValue(this.interests);
      this.educationForm.controls['edulevel'].setValue(this.educationLevel);
      this.educationForm.controls['edustatus'].setValue(this.educationStatus);
      this.budgetForm.controls['budgetvalue'].setValue(this.budget);
      this.languageForm.controls['englang'].setValue(this.englishTestName);
      this.languageForm.controls['frelang'].setValue(this.frenchTestName);
      this.languageForm.controls['engscore'].setValue(this.englishTestScore);
      this.languageForm.controls['frenchscore'].setValue(this.frenchTestScore);

      // if (studentEngTest == "I don't have a test") {
      //   this.engTest = 'No';
      // }
      // if (studentFrenchTest == "I don't have a test") {
      //   this.frTest = 'No';
      // }
      if (this.empId != null && this.empId != '') {
        this.getRepresentativeInfo();
      }

      this.setEduLevelOpt(this.educationStatus);
    });
  }

  // get representative info
  getRepresentativeInfo() {
    this._StudentsService
      .getRepresentative(this.empId)
      .subscribe((data: any) => {
        this.repName = data['message'].name;
        this.repNumber = data['message'].phone;
        localStorage.setItem("RepName", this.repName);


        if (this.repName == '') {
          this.represntativefound = false;
        }
      });
  }



  // To choose an image
  chooseImage(event: any): void {
    const file = <File>event.target.files[0];
    console.log(file);

    if (file === undefined) {
      this.errorMsg = 'Please Choose a File First!';
      this.fileSelected = undefined;
    } else {
      const fileName = file.name;
      const lastIndex = fileName.lastIndexOf('.');
      const fileExtension = fileName.slice(lastIndex + 1, fileName.length);
      this.uploadImage();
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
      this._UploadService.uploadFile(this.currentImage, 'image').subscribe(
        (percentage) => {
          console.log('percento', percentage);
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
    this.uploadImage();
  }

  openModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  showMobile() {
    this.openLang = false;
    this.openinter = false;
    this.openbudget = false;
    if (this.openMobile == false) {
      this.openMobile = true;
    } else {
      this.openMobile = false;
    }
  }

  showLang() {
    this.openMobile = false;
    this.openinter = false;
    this.openbudget = false;
    if (this.openLang == false) {
      this.openLang = true;
    } else {
      this.openLang = false;
    }
  }

  showinter() {
    this.openLang = false;
    this.openMobile = false;
    this.openbudget = false;
    if (this.openinter == false) {
      this.openinter = true;
    } else {
      this.openinter = false;
    }
  }

  showbudget() {
    this.openLang = false;
    this.openinter = false;
    this.openMobile = false;
    if (this.openbudget == false) {
      this.openbudget = true;
    } else {
      this.openbudget = false;
    }
  }

  navigateToProgram() {
    this.router.navigate(['/landing/programs']);
    this._ModalService.dismissAll();
  }

  dismiss() {
    this._ModalService.dismissAll();
  }

  clearEnglish(FormGroup: any){
    console.log(FormGroup.value);
    var engtest;
    switch(FormGroup.value.englang){
      case 'IELTS':
        engtest = 1;
        break;
      case 'TOEFL':
        engtest = 2;
        break;
      case 'Duolingo':
        engtest = 3;
        break;
      case 'Easy speaking':
        engtest = 4;
        break;
    }

    var frctest;
    switch(FormGroup.value.frelang){
      case 'DELF':
        frctest = 1;
        break;
      case 'DALF':
        frctest = 2;
        break;
      case 'TCF':
        frctest = 3;
        break;
    }
    this._ChatbotService
      .updatePreference(
        '',
        '',
        '',
        '',
        '5',
        '5',
        '',
        ''
      )
      .subscribe((data: any) => {
        this.frenchTestName = FormGroup.value.frelang;
        this.frenchTestScore = FormGroup.value.frenchscore;
        this.englishTestName = FormGroup.value.englang;
        this.englishTestScore = FormGroup.value.engscore;
        if (data.status === 201) {
          this.confirmAction(data.message);
        } else {
          this.errorAction();
        }
      });
    this.showLang();
  }
  clearFrench(FormGroup: any) {
    console.log(FormGroup.value);
    var engtest;
    switch(FormGroup.value.englang){
      case 'IELTS':
        engtest = 1;
        break;
      case 'TOEFL':
        engtest = 2;
        break;
      case 'Duolingo':
        engtest = 3;
        break;
      case 'Easy speaking':
        engtest = 4;
        break;
    }

    var frctest;
    switch(FormGroup.value.frelang){
      case 'DELF':
        frctest = 1;
        break;
      case 'DALF':
        frctest = 2;
        break;
      case 'TCF':
        frctest = 3;
        break;
    }
    this._ChatbotService
      .updatePreference(
        '',
        '',
        '5',
        FormGroup.value.frenchscore,
        engtest,
        FormGroup.value.engscore,
        '',
        ''
      )
      .subscribe((data: any) => {
        this.frenchTestName = FormGroup.value.frelang;
        this.frenchTestScore = FormGroup.value.frenchscore;
        this.englishTestName = FormGroup.value.englang;
        this.englishTestScore = FormGroup.value.engscore;
        if (data.status === 201) {
          this.confirmAction(data.message);
        } else {
          this.errorAction();
        }
      });
    this.showLang();
  }
}

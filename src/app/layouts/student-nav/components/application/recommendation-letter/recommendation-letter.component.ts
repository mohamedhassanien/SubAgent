import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';

@Component({
  selector: 'app-recommendation-letter',
  templateUrl: './recommendation-letter.component.html',
  styleUrls: ['./recommendation-letter.component.scss']
})
export class RecommendationLetterComponent implements OnInit {
  constructor(private _UploadService: UploadService,
    private _StudentsService: StudentsService,
    private _SharedService: SharedService) { }

  userName: string = String(localStorage.getItem('userName'));
  firstSelectedFile!: File | undefined;
  currentFirstFile!: Upload;

  firstSelectCondition: boolean = false;
  firstErrorMsg!: string | undefined;

  firstFileName!: string;
  firstFileUrl!: string;
  firstFilePercentage: number = 0;
  firstFileLoading: boolean = false;


  ngOnInit(): void {
    this.getProfileData()
  }

  // Options for Animations
  ml: AnimationOptions = {
    path: '../../../../../../assets/images/navigator/application/ml/ml.json',
  };
  cv: AnimationOptions = {
    path: '/assets/images/navigator/application/cv/cv.json',
  };

  displayCustom!: boolean;

  activeIndex: number = 0;

  images = [
    {
      previewImageSrc:
        '/assets/images/navigator/application/rl/examples/rl-1.svg',
      thumbnailImageSrc:
        '/assets/images/navigator/application/rl/examples/rl-1.svg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      previewImageSrc:
        '/assets/images/navigator/application/rl/examples/rl-2.svg',
      thumbnailImageSrc:
        '/assets/images/navigator/application/rl/examples/rl-2.svg',
      alt: 'Description for Image 2',
      title: 'Title 2',
    },
    {
      previewImageSrc:
        '/assets/images/navigator/application/rl/examples/rl-3.svg',
      thumbnailImageSrc:
        '/assets/images/navigator/application/rl/examples/rl-3.svg',
      alt: 'Description for Image 3',
      title: 'Title 3',
    },
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  teamOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 24,
    autoplay: false,
    autoplaySpeed: 1200,
    autoplayTimeout: 2500,
    navSpeed: 700,
    rewind: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  getProfileData() {
    const userEmail = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(userEmail).subscribe((res: any) => {

      const [
        {
          data: [
            {
              rl: { fileName: firstFileName = '', fileUrl: firstFileUrl = '' },
            },
          ],
        },
      ] = res;

      if (firstFileName === '' && firstFileUrl === '') {
        this.firstFileLoading = false;
      } else {
        this.firstFileLoading = true;
        this.firstFileUrl = firstFileUrl;
        this.firstFileName = firstFileName;
      }


    });
  }

  // To handle first File upload
  chooseFirst(event: any): void {
    const file = <File>event.target.files[0];
    if (file === undefined) {
      this.firstSelectCondition = true;
      this.firstErrorMsg = 'Please Choose a File First!';
      this.firstSelectedFile = undefined;
    } else {
      const fileName = file.name;
      const lastIndex = fileName.lastIndexOf('.');
      const fileExtension = fileName.slice(lastIndex + 1, fileName.length);
      this.uploadFirst()
      if (
        fileExtension === 'pdf' ||
        fileExtension === 'png' ||
        fileExtension === 'jpg' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'doc'
      ) {
        this.firstSelectCondition = false;
        this.firstSelectedFile = <File>event.target.files[0];
        this.uploadFirst()
      } else {
        this.firstSelectedFile = undefined;
        this.firstSelectCondition = true;
        this.firstErrorMsg = 'Please Select a suitable File..';
      }
    }
  }
  // Upload first
  uploadFirst(): void {
    const fileType = 'rl';

    if (this.firstSelectedFile === undefined) {
      this.firstSelectCondition = true;
      this.firstErrorMsg = 'Please Choose a File First!';
      return;
    } else {
      this.firstSelectCondition = false;
      const file: File = this.firstSelectedFile;
      this.currentFirstFile = new Upload(file);

      this._UploadService.uploadFile(this.currentFirstFile, fileType, this.userName).subscribe(
        (percentage) => {
          this.firstFileName = file.name;
          this.firstFileUrl = this.currentFirstFile.url;
          this.firstFileLoading = true;
          this.firstFilePercentage = Math.round(percentage ? percentage : 0);
          if (percentage === 100) {
            setTimeout(() => {
              this.firstFileUrl = this.currentFirstFile.url;
              this._SharedService.progressChanged.emit();
            }, 1000);
          }
        },
        () => {
          this.firstSelectCondition = true;
          this.firstErrorMsg = 'Something Went Wrong. Try again!';
        }
      );
    }
  }
  // Delete first
  deleteFirst() {
    const fileType = 'rl';

    this._UploadService.deleteFile(
      this.currentFirstFile,
      fileType,
      this.firstFileName,
      this.userName
    );
    this.firstFileLoading = false;
    this.firstSelectCondition = true;
    this.firstErrorMsg = 'File has been Deleted Successfully!';
    setTimeout(() => {
      this.firstSelectCondition = false;
      this.firstErrorMsg = undefined;
      this._SharedService.progressChanged.emit();
    }, 2500);
  }

}

import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { Component, Input, OnInit } from '@angular/core';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadImgsService } from 'src/app/shared/services/upload/upload-imgs.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss'],
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: Upload;

  constructor(private uploadService: UploadImgsService) {}

  ngOnInit(): void {}

  // deleteFileUpload(fileUpload: Upload): void {
  //   this.uploadService.deleteFile(fileUpload);
  // }
}

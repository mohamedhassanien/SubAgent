import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UploadImgsService } from 'src/app/shared/services/upload/upload-imgs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
})
export class UploadListComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private uploadService: UploadImgsService) {}

  ngOnInit(): void {}
}

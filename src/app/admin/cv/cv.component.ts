import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  private fileSelected: File | null;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  public newEnCvSelected(files: FileList) {
    this.fileSelected = files.item(0);
  }

  public uploadCv() {
    if (this.fileSelected) {
      this.storageService.uploadCv('en', this.fileSelected);
    } else {
      throw new Error('Please selected a file');
    }
  }

}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  private selectedFile: File | null;
  public cvForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.initialiseForm();
  }

  public newCvSelected(files: FileList) {
    this.selectedFile = files.item(0);
  }

  public uploadCv() {
    if (this.selectedFile && this.cvForm.valid) {
      this.storageService.uploadCv(this.cvForm.controls.language.value, this.selectedFile);
    } else {
      throw new Error('Please selected a file');
    }
  }

  private initialiseForm() {
    this.cvForm = this.formBuilder.group({
      cv: [
        null,
        Validators.required
      ],
      language: [
        '',
        Validators.required
      ]
    });
  }

}

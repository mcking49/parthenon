import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StorageService } from './../../services/storage.service';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  public selectedFile: File;
  public cvForm: FormGroup;
  public isEditingMode: boolean = false;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.initialiseForm();
  }

  public get isFormDisabled(): boolean {
    return !this.isEditingMode || !this.cvForm.valid;
  }

  public get isUploadDisabled(): boolean {
    return !this.isEditingMode;
  }

  public newCvSelected(files: FileList) {
    this.selectedFile = files.item(0);
  }

  public toggleEditingState() {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.cvForm.controls, (value: any, key: string) => {
        this.cvForm.controls[key].enable();
      });
    } else {
      this.resetForm();
    }
  }

  public uploadCv() {
    if (this.selectedFile && this.cvForm.valid) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      const uploadTask = this.storageService.uploadCv(this.cvForm.controls.language.value, this.selectedFile);
      uploadTask.percentageChanges().subscribe((percentage) => {
        if (percentage === 100) {
          dialogRef.close();
          this.toggleEditingState();
        }
      });
    } else {
      throw new Error('Please select a file');
    }
  }

  private initialiseForm() {
    this.cvForm = this.formBuilder.group({
      cv: [
        {
          value: null,
          disabled: !this.isEditingMode,
        },
        Validators.required
      ],
      language: [
        {
          value: '',
          disabled: !this.isEditingMode,
        },
        Validators.required
      ]
    });
  }

  /**
   * Reset the form to it's initial states with default values.
   */
  private resetForm(): void {
    this.cvForm.reset();
    this.selectedFile = null;
    _.each(this.cvForm.controls, (value: any, key: string) => {
      this.cvForm.controls[key].setValue('');
      this.cvForm.controls[key].disable();
    });
  }

}

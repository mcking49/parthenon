import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  public isEditingMode: boolean;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private storageService: StorageService
  ) {
    this.isEditingMode = false;
  }

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
    const file: File = files.item(0);
    const fileTypeValidator: RegExp = /^(application\/pdf)$/;
    if (fileTypeValidator.test(file.type)) {
      this.selectedFile = file;
    } else {
      this.snackbar.open(
        'Invalid file type. Please select a .pdf file',
        'Close',
        {duration: 5000}
      );
    }
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

  public async uploadCv() {
    if (this.selectedFile && this.cvForm.valid) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      try {
        await this.storageService.uploadCv(this.cvForm.controls.language.value, this.selectedFile);
        this.snackbar.open(
          'Your CV has been uploaded',
          'Close',
          {duration: 3000}
        );
      } catch (error) {
        if (error.code === 'storage/unauthorized') {
          this.snackbar.open(
            error.message,
            'Close',
            {duration: 5000}
          );
        } else {
          console.error(error);
        }
      } finally {
        this.toggleEditingState();
        dialogRef.close();
      }
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

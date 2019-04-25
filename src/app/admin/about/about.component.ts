import { AboutService } from './../../services/about.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import * as _ from 'lodash';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public isEditingMode: boolean = false;
  public aboutForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initialiseForm();
  }

  public get isDisabled(): boolean {
    return !this.isEditingMode || !this.aboutForm.valid || this.aboutForm.pristine;
  }

  // private async submitForm() {
  //   // if (this.aboutForm.valid) {
  //   //   const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
  //   //     maxHeight: '150px',
  //   //     height: '150px',
  //   //     width: '150px'
  //   //   });

  //   //   let updatedProfile = {};
  //   //   _.each(this.aboutForm.controls, (formControl: FormControl, key: string) => {
  //   //     updatedProfile[key] = formControl.value;
  //   //   });

  //   //   try {
  //   //     await this.aboutService.updateProfile(updatedProfile as Profile);
  //   //     this.toggleEditingState();
  //   //     this.snackbar.open(
  //   //       'The changes have been saved',
  //   //       'Close',
  //   //       {
  //   //         duration: 3000,
  //   //       }
  //   //     );
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   } finally {
  //   //     dialogRef.close();
  //   //   }
  //   // } else {
  //   //   console.error('Form is invalid.');
  //   // }
  // }

  public toggleEditingState() {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.aboutForm.controls, (value: any, key: string) => {
        this.aboutForm.controls[key].enable();
      });
    } else {
      this.resetForm(true);
    }
  }

  private initialiseForm(): void {
    this.aboutForm = this.formBuilder.group({
      firstName: [
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
   *
   * @param {boolean} disableFields - Disable the fields after reseting the form.
   */
  private resetForm(disableFields?: boolean): void {
    this.aboutForm.reset();
    // _.each(this.about, (value: string, key: string) => {
    //   this.aboutForm.controls[key].setValue(value);
    //   if (disableFields) {
    //     this.aboutForm.controls[key].disable();
    //   }
    // });
  }

}

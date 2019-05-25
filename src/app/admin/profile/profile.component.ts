import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MatDialogConfig } from '@angular/material';
import { finalize } from 'rxjs/operators';

import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

import { Profile } from 'src/app/interfaces/profile';

import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { TrackingService } from 'src/app/services/tracking.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isEditingMode: boolean;
  public profile: Profile;
  public profileForm: FormGroup;
  public selectedFile: File;

  private loadingConfig: MatDialogConfig<any>;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
    private storageService: StorageService,
    private trackingService: TrackingService
  ) {
    this.isEditingMode = false;
    this.loadingConfig = {
      height: '150px',
      width: '150px'
    };
  }

  ngOnInit() {
    this.initialiseForm();
    this.profileService.profile$.subscribe((profile) => {
      this.profile = profile;
      this.resetForm();
    });
  }

  /**
   * Check if the save button should be disabled.
   *
   * @returns {boolean} - Returns trus if the save button should be disabled.
   */
  public get isSaveDisabled(): boolean {
    return !this.isEditingMode || !this.profileForm.valid || this.profileForm.pristine;
  }

  /**
   * Submit the profile form.
   */
  public submitForm(): void {
    if (this.profileForm.valid) {
      const loading = this.dialog.open(LoadingSpinnerModalComponent, this.loadingConfig);
      if (this.selectedFile) {
        // TODO: Fix saving profile image.
        this.storageService.uploadProfileImg(this.selectedFile).snapshotChanges().pipe(
          finalize(() => {
            this.storageService.profileImgRef.getDownloadURL().subscribe((url: string) => {
              this.profileForm.controls['profileImgUrl'].setValue(url);
              this.saveForm(loading);
            });
          })
        ).subscribe();
      } else {
        this.saveForm(loading);
      }
    } else {
      // TODO: Show toast.
      console.error('Form is invalid');
    }
  }

  // TODO: Merge this method with this.submitForm();
  private async saveForm(loading: MatDialogRef<LoadingSpinnerModalComponent, any>) {
    const updatedProfile = {};
    _.each(this.profileForm.controls, (formControl: FormControl, key: string) => {
      updatedProfile[key] = formControl.value;
    });

    try {
      await this.profileService.updateProfile(updatedProfile as Profile);
      // TODO: create snackbar method.
      this.snackbar.open(
        'The changes have been saved',
        'Close',
        {
          duration: 3000,
        }
      );
    } catch (error) {
      if (error.code === 'permission-denied') {
        this.snackbar.open(
          `Authentication error: ${error.message}`,
          'Close',
          {duration: 5000}
        );
      } else {
        console.error(error);
        this.trackingService.trackError('buttonClickException', error);
      }
    } finally {
      this.toggleEditingState();
      loading.close();
    }
  }

  /**
   * Save the newly selected files.
   *
   * @param {FileList} files - The list of files that have been selected.
   */
  public newImageSelected(files: FileList): void {
    this.selectedFile = files.item(0);
    this.profileForm.markAsDirty();
  }

  /**
   * Toggle the editing state of the form.
   */
  public toggleEditingState(): void {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.profileForm.controls, (value: any, key: string) => {
        this.profileForm.controls[key].enable();
      });
    } else {
      this.resetForm(true);
    }
  }

  /**
   * Initialise the profile form.
   */
  private initialiseForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [
        {
          value: '',
          disabled: !this.isEditingMode,
        },
        Validators.required
      ],
      lastName: [
        {
          value: '',
          disabled: !this.isEditingMode,
        },
        Validators.required
      ],
      jobTitle: [
        {
          value: '',
          disabled: !this.isEditingMode,
        },
        Validators.required
      ],
      email: [
        {
          value: '',
          disabled: !this.isEditingMode,
        },
        Validators.compose([Validators.email, Validators.required])
      ],
      phone: [
        {
          value: '',
          disabled: !this.isEditingMode,
        },
        Validators.required
      ],
      linkedInUrl: [
        {
          value: '',
          disabled: !this.isEditingMode
        },
      ],
      profileImg: [
        {
          value: '',
          disabled: !this.isEditingMode
        },
      ]
    });
  }

  /**
   * Reset the form to it's initial states with default values.
   *
   * @param {boolean} disableFields - Disable the fields after reseting the form.
   */
  private resetForm(disableFields?: boolean): void {
    this.profileForm.reset();
    this.selectedFile = null;
    _.each(this.profile, (value: string, key: string) => {
      this.profileForm.controls[key].setValue(value);
      if (disableFields) {
        this.profileForm.controls[key].disable();
      }
    });
  }

}

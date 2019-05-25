import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MatDialogConfig } from '@angular/material';
import { finalize } from 'rxjs/operators';

import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

import { Image } from 'src/app/interfaces/image';
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
   * Save the profile.
   */
  public async saveProfile(): Promise<void> {
    if (this.profileForm.valid) {
      const loading = this.dialog.open(LoadingSpinnerModalComponent, this.loadingConfig);
      try {
        if (this.selectedFile) {
          // First clean the storage and delete the old profile image.
          await this.storageService.deleteImage(this.profile.profileImg.storageReference);
          // Upload the new image.
          await this.storageService.uploadProfileImg(this.selectedFile);

          // Create profile image object.
          const profileImgStorageRef: string = this.storageService.getProfileImgStorageReference(this.selectedFile.name);
          const profileImgUrl: string = await this.storageService.getProfileImgDownloadUrl(profileImgStorageRef);
          const profileImg: Image = {
            filename: this.selectedFile.name,
            storageReference: profileImgStorageRef,
            url: profileImgUrl
          };
          this.profileForm.controls['profileImg'].setValue(profileImg);
        }

        // Save the profile.
        const updatedProfile: Profile = _.mapValues(this.profileForm.controls, 'value') as Profile;
        await this.profileService.updateProfile(updatedProfile);
        this.showSnackbar('The profile has been saved');
        this.toggleEditingState();
      } catch (error) {
        this.showSnackbar(error, 5000);
      } finally {
        loading.close();
      }
    } else {
      this.showSnackbar('The form is invalid');
    }
  }

  /**
   * Validate the newly selected file is the correct type and save it.
   *
   * @param {FileList} files - The list of files that have been selected.
   */
  public newImageSelected(files: FileList): void {
    const file: File = files.item(0);
    const fileTypeValidator: RegExp = /^(image)\/((png)|(jpg)|(jpeg))$/;
    if (fileTypeValidator.test(file.type)) {
      this.selectedFile = file;
      this.profileForm.markAsDirty();
    } else {
      this.showSnackbar('Invalid file type. Please select a .png, .jpg or .jpeg image', 5000);
    }
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

  /**
   * Show a snackbar with a custom message.
   *
   * @param {string} message - The message to show in the snackbar.
   * @param {number} duration - The duration to display the snackbar for. Default = 3000 (3 seconds).
   */
  private showSnackbar(message: string, duration: number = 3000): void {
    this.snackbar.open(message, 'Close', {duration});
  }

}

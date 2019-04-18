import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ProfileService } from './../../services/profile.service';
import { Profile } from 'src/app/interfaces/profile';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile$: Observable<Profile>;
  public profile: Profile;
  public profileForm: FormGroup;
  public isEditingMode: boolean = false;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.profile$ = this.profileService.getProfile();
    this.profile$.subscribe((profile) => {
      this.profile = profile;
      this.resetForm();
    });
    this.initialiseForm();
  }

  public get isDisabled(): boolean {
    return !this.isEditingMode || !this.profileForm.valid || this.profileForm.pristine;
  }

  public async submitForm() {
    if (this.profileForm.valid) {

      let updatedProfile = {};
      _.each(this.profileForm.controls, (formControl: FormControl, key: string) => {
        updatedProfile[key] = formControl.value;
      });

      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      try {
        await this.profileService.updateProfile(updatedProfile as Profile);
        this.toggleEditingState();
        this.snackbar.open(
          'The changes have been saved',
          'Close',
          {
            duration: 3000,
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        dialogRef.close();
      }
    } else {
      // This should be unreachable from the user's perspective.
      console.error(new Error('Form is invalid'));
    }
  }

  public toggleEditingState() {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.profileForm.controls, (value, key) => {
        this.profileForm.controls[key].enable();
      });
    } else {
      this.resetForm(true);
    }
  }

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
    _.each(this.profile, (value: string, key: string) => {
      this.profileForm.controls[key].setValue(value);
      if (disableFields) {
        this.profileForm.controls[key].disable();
      }
    });
  }

}

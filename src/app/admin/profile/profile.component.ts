import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ProfileService } from './../../services/profile.service';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile$: Observable<Profile>;
  private initialProfile: Profile;
  public profile: Profile;
  public profileForm: FormGroup;
  private initialProfileSet: boolean = false;

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
      if (!this.initialProfileSet) {
        this.initialProfile = profile;
        this.initialProfileSet = true;
      }
      _.each(this.profile, (value, key) => {
        this.profileForm.controls[key].setValue(value);
      });
    });
    this.initialiseForm();
  }

  public submitForm() {
    console.log('Form submitted');
  }

  private initialiseForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.required
      ],
      lastName: [
        '',
        Validators.required
      ],
      email: [
        '',
        Validators.required
      ],
      phone: [
        '',
        Validators.required
      ],
      linkedInUrl: [
        ''
      ]
    });
  }

}

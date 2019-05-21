import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password-validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public changePasswordForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder
      .group({
        password: [
          '',
          [Validators.required, Validators.minLength(6)]
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6)]
        ]
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword
      });
  }

  /**
   * Submit the form and change the password for the user.
   */
  public async changePassword() {
    if (this.changePasswordForm.valid) {
      const loading = this.dialog.open(LoadingSpinnerModalComponent, {
        height: '150px',
        width: '150px'
      });

      const newPassword: string = this.changePasswordForm.get('password').value;
      try {
        await this.authService.updatePassword(newPassword);
        this.snackbar.open(
          'Your password has been changed.',
          'Close',
          {duration: 3000}
        );
        this.router.navigate(['../dashboard'], {relativeTo: this.activatedRoute});
      } catch (error) {
        this.snackbar.open(
          'Error: something went wrong. Please try again',
          'Close',
          {duration: 5000}
        );
        console.error(error);
      } finally {
        loading.close();
      }
    }
  }

}

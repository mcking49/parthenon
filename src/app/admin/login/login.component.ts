import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    // If the user is already logged in, redirect them to the dashboard
    this.authService.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['../dashboard'], {relativeTo: this.activatedRoute});
      }
    });
    this.initialiseForm();
  }

  public async login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      try {
        await this.authService.login(username, password);
        this.router.navigate(['../dashboard'], {relativeTo: this.activatedRoute});
      } catch (error) {
        // Not displaying the actual error so if a hacker tries to hack into website
        // they will have no feedback from the app to help them successfully hack the app.
        this.snackbar.open(
          'Username or password is incorrect',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'bottom'
          }
        );
      } finally {
        dialogRef.close();
      }
    } else {
      // This should be unreachable from the user's perspective.
      console.error(new Error('Form is invalid'));
    }
  }

  private initialiseForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        Validators.required
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

}

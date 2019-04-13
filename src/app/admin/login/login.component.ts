import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.currentUser) {
      this.router.navigate(['../dashboard'], {relativeTo: this.activatedRoute});
    }
  }

  public async login() {
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px'
    });

    try {
      await this.authService.login('', '');
      this.router.navigate(['../dashboard'], {relativeTo: this.activatedRoute});
    } catch (error) {
      console.error(error);
    } finally {
      dialogRef.close();
    }
  }

}

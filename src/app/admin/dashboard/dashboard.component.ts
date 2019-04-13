import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public async logout() {
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px'
    });
    try {
      await this.authService.logout();
      this.router.navigate(['../login'], {relativeTo: this.activatedRoute});
    } catch (error) {
      console.error(error);
    } finally {
      dialogRef.close();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingSpinnerModalComponent } from '../components/loading-spinner-modal/loading-spinner-modal.component';
import { AuthenticationService } from '../services/authentication.service';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private readonly loginUrl = '/admin/login';
  public isHandset$: Observable<boolean>;
  public isLoginPage: boolean;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private responsiveService: ResponsiveService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isHandset$ = this.responsiveService.isHandset;

    // initialise the isLoginPage field.
    this.isLoginPage = this.router.routerState.snapshot.url === this.loginUrl;

    // Subscribe to the Router events to update isLoginPage when the URL changes.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === this.loginUrl;
      }
    });
  }

  /**
   * Logout of the admin panel.
   */
  public async logout() {
    const loading = this.dialog.open(LoadingSpinnerModalComponent, {
      height: '150px',
      width: '150px'
    });
    try {
      await this.authService.logout();
      this.router.navigate([this.loginUrl]);
    } catch (error) {
      console.error(error);
    } finally {
      loading.close();
    }
  }

}

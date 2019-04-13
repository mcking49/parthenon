import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public isHandset$: Observable<boolean>;
  public isLoginPage: boolean;
  private readonly loginUrl = '/admin/login';

  constructor(
    private responsiveService: ResponsiveService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isHandset$ = this.responsiveService.isHandset;

    // initialise the isLoginPage field.
    this.isLoginPage = this.router.routerState.snapshot.url === this.loginUrl

    // Subscribe to the Router events to update isLoginPage when the URL changes.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === this.loginUrl;
      }
    });
  }

}

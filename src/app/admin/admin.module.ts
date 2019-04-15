import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AdminComponent } from './admin.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';

// Angular Material + Layout
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

// Other
import { AdminRoutingModule } from './admin-routing.module';
import { CvComponent } from './cv/cv.component';

@NgModule({
  declarations: [
    AdminComponent,
    AboutComponent,
    ProfileComponent,
    DashboardComponent,
    LoginComponent,
    ProjectComponent,
    ProjectsComponent,
    CvComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

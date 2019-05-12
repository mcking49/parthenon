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
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
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
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

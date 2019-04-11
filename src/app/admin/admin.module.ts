import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AdminComponent } from './admin.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';

// Angular Material + Layout
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

// Other
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    LoginComponent,
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

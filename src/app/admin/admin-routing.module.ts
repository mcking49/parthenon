import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';

import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin.component';
import { CvComponent } from './cv/cv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:url',
        component: ProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cv',
        component: CvComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

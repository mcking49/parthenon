import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { ThesisComponent } from './components/thesis/thesis.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project/:url', component: ProjectComponent },
  { path: 'master-thesis/2019-the-togetherness-of-strangers', component: ThesisComponent },
  { path: 'thesis', redirectTo: '/master-thesis/2019-the-togetherness-of-strangers', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 64],
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

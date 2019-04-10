import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AustinComponent } from './austin.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: AustinComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'project/:url', component: ProjectComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AustinRoutingModule { }

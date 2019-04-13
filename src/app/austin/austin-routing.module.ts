import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AustinComponent } from './austin.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ThesisComponent } from './thesis/thesis.component';

const routes: Routes = [
  {
    path: '',
    component: AustinComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'project/:url', component: ProjectComponent },
      { path: 'master-thesis/2019-the-togetherness-of-strangers', component: ThesisComponent},
      { path: 'thesis', redirectTo: 'master-thesis/2019-the-togetherness-of-strangers', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AustinRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { ThesisComponent } from './components/thesis/thesis.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'austin', pathMatch: 'full' },
  { path: 'austin', loadChildren: './austin/austin.module#AustinModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
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

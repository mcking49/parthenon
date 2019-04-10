import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AustinComponent } from './austin.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectComponent } from './project/project.component';

// Angular Material + Bootstrap
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

// Other
import { AustinRoutingModule } from './austin-routing.module';

@NgModule({
  declarations: [
    AustinComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    NavigationComponent,
    PortfolioComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    NgbCarouselModule,
    AustinRoutingModule
  ]
})
export class AustinModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import {
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';
import { ProjectComponent } from './components/project/project.component';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadSpinnerModalComponent } from './components/download-spinner-modal/download-spinner-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    PortfolioComponent,
    ContactComponent,
    HomeComponent,
    ProjectComponent,
    DownloadSpinnerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgbCarouselModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [DownloadSpinnerModalComponent]
})
export class AppModule { }

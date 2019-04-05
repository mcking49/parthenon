import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import {
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { ProjectComponent } from './project/project.component';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadSpinnerModalComponent } from './download-spinner-modal/download-spinner-modal.component';
import { LayoutModule } from '@angular/cdk/layout';

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
    NgbCarouselModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [DownloadSpinnerModalComponent]
})
export class AppModule { }

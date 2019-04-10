import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { DownloadSpinnerModalComponent } from './components/download-spinner-modal/download-spinner-modal.component';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { firebaseConfig } from './config/firebase';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatProgressSpinnerModule,
} from '@angular/material';

// Other
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DownloadSpinnerModalComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [DownloadSpinnerModalComponent]
})
export class AppModule { }

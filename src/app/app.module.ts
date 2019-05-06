import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { LoadingSpinnerModalComponent } from './components/loading-spinner-modal/loading-spinner-modal.component';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './config/firebase';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

// Other
import { AppRoutingModule } from './app-routing.module';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerModalComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [LoadingSpinnerModalComponent, ConfirmDeleteComponent]
})
export class AppModule { }

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { firebaseConfig } from 'src/app/config/firebase';

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from './home.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent,
        ContactComponent,
        HomeComponent,
        PortfolioComponent
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        MatCardModule,
        MatDialogModule,
        MatGridListModule,
        MatListModule,
        MatProgressSpinnerModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

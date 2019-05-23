import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatIconModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import { firebaseConfig } from 'src/app/config/firebase';

import { CvComponent } from './cv.component';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvComponent ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule,
        MatDialogModule,
        MatIconModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

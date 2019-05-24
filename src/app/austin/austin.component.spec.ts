import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from 'src/environments/environment';
import { AustinComponent } from './austin.component';
import { NavigationComponent } from './navigation/navigation.component';

describe('AustinComponent', () => {
  let component: AustinComponent;
  let fixture: ComponentFixture<AustinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AustinComponent,
        NavigationComponent
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AustinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

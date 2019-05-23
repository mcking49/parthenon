import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AustinComponent } from './austin.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';

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

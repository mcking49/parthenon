import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

import { LoadingSpinnerModalComponent } from './loading-spinner-modal.component';

describe('LoadingSpinnerModalComponent', () => {
  let component: LoadingSpinnerModalComponent;
  let fixture: ComponentFixture<LoadingSpinnerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerModalComponent ],
      imports: [
        MatDialogModule,
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

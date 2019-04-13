import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerModalComponent } from './loading-spinner-modal.component';

describe('LoadingSpinnerModalComponent', () => {
  let component: LoadingSpinnerModalComponent;
  let fixture: ComponentFixture<LoadingSpinnerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerModalComponent ]
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSpinnerModalComponent } from './download-spinner-modal.component';

describe('DownloadSpinnerModalComponent', () => {
  let component: DownloadSpinnerModalComponent;
  let fixture: ComponentFixture<DownloadSpinnerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSpinnerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSpinnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

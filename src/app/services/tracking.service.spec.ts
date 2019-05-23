import { TestBed } from '@angular/core/testing';

import { TrackingService } from './tracking.service';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../config/firebase';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('TrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    ]
  }));

  it('should be created', () => {
    const service: TrackingService = TestBed.get(TrackingService);
    expect(service).toBeTruthy();
  });
});

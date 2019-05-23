import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../config/firebase';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    ]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});

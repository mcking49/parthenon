import { TestBed } from '@angular/core/testing';

import { AboutService } from './about.service';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../config/firebase';
import { AngularFirestoreModule } from '@angular/fire/firestore';

fdescribe('AboutService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    ]
  }));

  it('should be created', () => {
    const service: AboutService = TestBed.get(AboutService);
    expect(service).toBeTruthy();
  });
});

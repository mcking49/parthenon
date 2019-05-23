import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../config/firebase';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireStorageModule
    ]
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../config/firebase';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('ProjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    ]
  }));

  it('should be created', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });
});

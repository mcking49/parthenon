import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileDoc: AngularFirestoreDocument<Profile>;
  private profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public profile$: Observable<Profile> = this.profile.asObservable();

  constructor(
    private afStore: AngularFirestore
  ) {
    this.profileDoc = this.afStore.doc<Profile>('profile/1');
    this.profileDoc.valueChanges().subscribe((profile) => {
      // Updates the local copy.
      this.profile.next(profile);
    });
  }

  /**
   * Update the user profile.
   *
   * @param {Profile} profile - The new updated profile values to be saved.
   * @returns {Promise<void>} - Resolves a promise when the update completes.
   */
  public updateProfile(profile: Profile): Promise<void> {
    return this.profileDoc.update(profile);
  }
}

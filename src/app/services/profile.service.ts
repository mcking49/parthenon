import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { Profile } from 'src/app/interfaces/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileDoc: AngularFirestoreDocument<Profile>;
  private profile$: Observable<Profile>;

  constructor(
    private afStore: AngularFirestore
  ) {
    this.profileDoc = this.afStore.doc<Profile>('profile/1');
    this.profile$ = this.profileDoc.valueChanges();
    this.getProfile();
  }

  /**
   * Get the profile.
   *
   * @returns {Observable<Profile>} - The user's profile.
   */
  public getProfile(): Observable<Profile> {
    return this.profile$;
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

import { About } from './../interfaces/about';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private aboutDoc: AngularFirestoreDocument<About>;
  private about: BehaviorSubject<About> = new BehaviorSubject<About>(null);
  public about$: Observable<About> = this.about.asObservable();

  constructor(
    private afStore: AngularFirestore
  ) {
    this.aboutDoc = this.afStore.doc<About>('website/about');
    this.aboutDoc.valueChanges().subscribe((about: About) => {
      // Updates the local copy.
      this.about.next(about);
    });
  }

  /**
   * Update the about section.
   *
   * @param {About} about - The new updated about section to be saved.
   * @returns {Promise<void>} - Resolves a promise when the update completes.
   */
  public updateAbout(about: About): Promise<void> {
    return this.aboutDoc.update(about);
  }
}

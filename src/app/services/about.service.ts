import { About } from './../interfaces/about';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private aboutDoc: AngularFirestoreDocument<About>;
  private about$: Observable<About>;

  constructor(
    private afStore: AngularFirestore
  ) {
    this.aboutDoc = this.afStore.doc<About>('website/about');
    this.about$ = this.aboutDoc.valueChanges();
    this.getAbout();
  }

  /**
   * Get the website's about section.
   *
   * @returns {Observable<About>} - The website's about section.
   */
  public getAbout(): Observable<About> {
    return this.about$;
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

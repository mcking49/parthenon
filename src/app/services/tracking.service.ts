import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ButtonTracker } from '../interfaces/button-tracker';

export type ButtonName = 'downloadCvDe' | 'downloadCvEn' | 'downloadThesis';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private buttonTrackingDoc: AngularFirestoreDocument<ButtonTracker>;
  private buttonTracking: BehaviorSubject<ButtonTracker> = new BehaviorSubject<ButtonTracker>(null);
  private buttonTracking$: Observable<ButtonTracker> = this.buttonTracking.asObservable();
  private buttonTrackers: ButtonTracker;

  constructor(private afStore: AngularFirestore) {
    this.buttonTrackingDoc = this.afStore.doc<ButtonTracker>('tracking/button');
    this.buttonTrackingDoc.valueChanges().subscribe((buttonTrackers: ButtonTracker) => {
      this.buttonTracking.next(buttonTrackers);
    });
    this.buttonTracking$.subscribe((buttonTrackers: ButtonTracker) => {
      this.buttonTrackers = buttonTrackers;
    });
  }

  /**
   * Track a button click.
   *
   * This will increment the number of times the button has been clicked and
   * then saved to the database.
   *
   * @param {ButtonName} buttonName - The name of the button to track. See type "ButtonName".
   *
   * @returns {Promise<void>} - Resolves when the tracking data has been saved to the database.
   */
  public trackButton(buttonName: ButtonName): Promise<void> {
    this.buttonTrackers[buttonName]++;
    return this.buttonTrackingDoc.update(this.buttonTrackers);
  }
}

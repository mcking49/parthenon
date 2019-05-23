import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ButtonTracker } from '../interfaces/button-tracker';

export type ButtonName = 'downloadCvDe' | 'downloadCvEn' | 'downloadThesis' | 'linkedIn';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private buttonTrackingDoc: AngularFirestoreDocument<ButtonTracker>;
  private buttonTracking: BehaviorSubject<ButtonTracker> = new BehaviorSubject<ButtonTracker>(null);
  public buttonTracking$: Observable<ButtonTracker> = this.buttonTracking.asObservable();

  constructor(private afStore: AngularFirestore) {
    this.buttonTrackingDoc = this.afStore.doc<ButtonTracker>('tracking/button');
    this.buttonTrackingDoc.valueChanges().subscribe((buttonTrackers: ButtonTracker) => {
      this.buttonTracking.next(buttonTrackers);
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
    const buttonTrackers: ButtonTracker = this.buttonTrackers;
    buttonTrackers[buttonName]++;
    return this.buttonTrackingDoc.update(buttonTrackers);
  }

  /**
   * Get the current value of the button trackers.
   *
   * @returns {ButtonTracker} - The current button tracker values.
   */
  private get buttonTrackers(): ButtonTracker {
    return this.buttonTracking.getValue();
  }
}

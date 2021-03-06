import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ButtonTracker } from '../interfaces/button-tracker';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

export type ButtonName = 'downloadCvDe' | 'downloadCvEn' | 'downloadThesis' | 'linkedIn';

// Google Analytics
declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  public analytics: Subscription;
  private trackingId: string;

  private buttonTrackingDoc: AngularFirestoreDocument<ButtonTracker>;
  private buttonTracking: BehaviorSubject<ButtonTracker> = new BehaviorSubject<ButtonTracker>(null);
  public buttonTracking$: Observable<ButtonTracker> = this.buttonTracking.asObservable();

  constructor(
    private afStore: AngularFirestore,
    private router: Router,
  ) {
    this.buttonTrackingDoc = this.afStore.doc<ButtonTracker>('tracking/button');
    this.buttonTrackingDoc.valueChanges().subscribe((buttonTrackers: ButtonTracker) => {
      this.buttonTracking.next(buttonTrackers);
    });
    this.trackingId = environment.googleAnalytics.trackingId;
  }

  /**
   * Start tracking analytics on Google Analytics.
   */
  public start(): void {
    if (!this.analytics) {
      this.analytics = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          try {
            gtag('config', this.trackingId, {'page_path': event.urlAfterRedirects});
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  }

  /**
   * Stop tracking analytics on Google Analytics.
   */
  public stop(): void {
    if (this.analytics) {
      this.analytics.unsubscribe();
    }
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
    try {
      gtag('event', 'buttonClick', {
        'event_category': 'Button Click',
        'event_label': buttonName
      });
    } catch (error) {
      console.error(error);
    }
    return this.buttonTrackingDoc.update(buttonTrackers);
  }

  // TODO: Improve this feature.
  public trackError(exceptionType: string, error: any): void {
    gtag('event', exceptionType, {
      'event_category': 'Exception',
      'event_label': error,
    });
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

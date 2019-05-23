import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService, ButtonName } from 'src/app/services/tracking.service';
import { ButtonTracker } from 'src/app/interfaces/button-tracker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public buttonTrackers: ButtonTracker;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.trackingService.buttonTracking$.subscribe((buttonTrackers: ButtonTracker) => {
      this.buttonTrackers = buttonTrackers;
    });
  }

  /**
   * Get a label for the statistics box that relates to the stat buton.
   *
   * @param {ButtonName} buttonName - The name of the button to get the label for.
   *
   * @returns {string} - The label for the statistics box.
   */
  public getStatLabel(buttonName: ButtonName): string {
    switch (buttonName) {
      case 'downloadCvDe': {
        return 'CV Downloads (de)';
      }
      case 'downloadCvEn': {
        return 'CV Downloads (en)';
      }
      case 'downloadThesis': {
        return 'Thesis Downloads';
      }
      case 'linkedIn': {
        return 'LinkedIn Profile Opens';
      }
      default: {
        console.error(`Unknown button name: ${buttonName}`);
        return 'Unknown';
      }
    }
  }

}

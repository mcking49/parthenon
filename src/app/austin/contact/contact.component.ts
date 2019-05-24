import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { Profile } from 'src/app/interfaces/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CvLanguage, StorageService } from 'src/app/services/storage.service';
import { ButtonName, TrackingService } from 'src/app/services/tracking.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public showLoading = false;
  public email: string;
  public phone: string;
  public linkedInUrl: string;

  constructor(
    private authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private storageService: StorageService,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.authService.anonymousLogin().then(() => {
      this.profileService.profile$.subscribe((profile: Profile) => {
        if (profile) {
          this.email = profile.email;
          this.phone = profile.phone;
          this.linkedInUrl = profile.linkedInUrl;
          this.changeDetector.detectChanges();
        }
      });
    });
  }

  /**
   * Check if the contact details are still loading.
   *
   * @returns {boolean} - Returns true if the contact details haven't been loaded yet.
   */
  public get isLoading(): boolean {
    return !this.email && !this.phone && !this.linkedInUrl;
  }

  /**
   * Download the CV from the database.
   *
   * @param language - The language of the CV to download
   */
  public async downloadCv(language: CvLanguage) {
    this.showLoading = true;
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px'
    });
    try {
      await this.storageService.downloadCv(language);
      this.trackingService.trackButton(`downloadCv${_.capitalize(language)}` as ButtonName);
    } catch (error) {
      console.error(error);
    } finally {
      dialogRef.close();
      this.showLoading = false;
    }
  }

  /**
   * Track the click of the linkedin button.
   */
  public trackLinkedIn(): void {
    this.trackingService.trackButton('linkedIn');
  }

}

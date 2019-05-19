import { Profile } from './../../interfaces/profile';
import { ProfileService } from './../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { CvLanguage, StorageService } from '../../services/storage.service';
import { MatDialog } from '@angular/material';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

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
    private dialog: MatDialog,
    private profileService: ProfileService,
    private storage: StorageService) { }

  ngOnInit() {
    this.profileService.profile$.subscribe((profile: Profile) => {
      if (profile) {
        this.email = profile.email;
        this.phone = profile.phone;
        this.linkedInUrl = profile.linkedInUrl;
      }
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
      await this.storage.downloadCv(language);
    } catch (error) {
      console.error(error);
    } finally {
      dialogRef.close();
      this.showLoading = false;
    }
  }

}

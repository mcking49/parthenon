import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerModalComponent } from '../../components/loading-spinner-modal/loading-spinner-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.scss']
})
export class ThesisComponent implements OnInit {

  public showLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private storage: StorageService,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.showLoading = false;
  }

  async downloadThesis() {
    this.showLoading = true;
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px',
    });
    try {
      await this.storage.downloadThesis();
      this.trackingService.trackButton('downloadThesis');
    } catch (error) {
      console.error(error);
    } finally {
      dialogRef.close();
      this.showLoading = false;
    }
  }

}

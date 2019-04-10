import { Component, OnInit } from '@angular/core';
import { DownloadSpinnerModalComponent } from '../download-spinner-modal/download-spinner-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.scss']
})
export class ThesisComponent implements OnInit {

  public downloadInProgress: boolean;

  constructor(private dialog: MatDialog, private storage: StorageService) { }

  ngOnInit() {
    this.downloadInProgress = false;
  }

  async downloadThesis() {
    this.downloadInProgress = true;
    const dialogRef = this.dialog.open(DownloadSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px',
    });
    await this.storage.downloadThesis();
    dialogRef.close();
    this.downloadInProgress = false;
  }

}

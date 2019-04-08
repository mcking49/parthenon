import { AboutComponent } from './../about/about.component';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { MatDialog } from '@angular/material';
import { DownloadSpinnerModalComponent } from '../download-spinner-modal/download-spinner-modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  downloadInProgress = false;

  constructor(private storage: StorageService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  async downloadCv(language: string) {
    this.downloadInProgress = true;
    const dialogRef = this.dialog.open(DownloadSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px',
    });
    await this.storage.downloadCv(language);
    dialogRef.close();
    this.downloadInProgress = false;
  }

}

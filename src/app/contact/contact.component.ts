import { AboutComponent } from './../about/about.component';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../storage.service';
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

  async downloadCv() {
    this.downloadInProgress = true;
    let dialogRef = this.dialog.open(DownloadSpinnerModalComponent, {
      height: '150px',
      width: '150px',
    });
    await this.storage.downloadCv();
    dialogRef.close();
    this.downloadInProgress = false;
  }

}

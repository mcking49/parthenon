import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { MatDialog } from '@angular/material';
import { DownloadSpinnerModalComponent } from 'src/app/components/download-spinner-modal/download-spinner-modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public downloadInProgress = false;

  constructor(private dialog: MatDialog, private storage: StorageService) { }

  ngOnInit() {
  }

  public async downloadCv(language: string): Promise<void> {
    this.downloadInProgress = true;
    const dialogRef = this.dialog.open(DownloadSpinnerModalComponent, {
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
      this.downloadInProgress = false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { StorageService } from './../storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private storage: StorageService) { }

  ngOnInit() {
  }

  downloadCv() {
    this.storage.downloadCv();
  }

}

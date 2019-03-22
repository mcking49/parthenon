import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}

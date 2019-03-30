import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageRef: firebase.storage.Reference;

  constructor() {
    this.initialiseFirebaseStorage();
  }

  public downloadCv() {
    this.cvRef.getDownloadURL()
      .then((url) => {
        window.open(url, '_blank');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private initialiseFirebaseStorage() {
    this.storageRef = firebase.storage().ref();
  }

  get cvRef() {
    return this.storageRef.child('cv/Dsouza_Austin-CV19-Web.pdf');
  }
}

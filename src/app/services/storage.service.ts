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

  public downloadCv(language: string): Promise<any> {
    return this.getCvRef(language).getDownloadURL()
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

  private getCvRef(language: string): firebase.storage.Reference {
    return this.storageRef.child(`cv/Dsouza_Austin-CV19-${language}.pdf`);
  }
}

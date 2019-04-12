import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  /**
   * Download the CV.
   *
   * @param {string} language - The language of the CV to download. Only accepts 'en' or 'de'.
   */
  public downloadCv(language: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getCvDownloadUrl(language).subscribe(
        (url: string) => {
          window.open(url, '_blank');
          resolve(true);
        },
        (error: Error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Download the Thesis.
   */
  public downloadThesis(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getThesisDownloadUrl().subscribe(
        (url: string) => {
          window.open(url, '_blank');
          resolve(true);
        },
        (error: Error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Get the CV downloadUrl observable.
   *
   * @param {string} language - The language of the CV to download.
   *
   * @returns {Observable<string>} - The downloadURL Observable.
   */
  private getCvDownloadUrl(language: string): Observable<string> {
    return this.storage.ref(`cv/Dsouza_Austin-CV19-${language}.pdf`).getDownloadURL();
  }

  /**
   * Get the Thesis downloadUrl observable.
   *
   * @returns {Observable<string>} - The downloadURL Observable.
   */
  private getThesisDownloadUrl(): Observable<string> {
    return this.storage.ref(`thesis/Dsouza_Austin_Togetherness-of-Strangers.pdf`).getDownloadURL();
  }
}

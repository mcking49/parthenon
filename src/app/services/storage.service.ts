import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  /**
   * Get the storage reference for the profile image.
   *
   * @returns {AngularFireStorageReference} - A storage reference for the profile image.
   */
  public get profileImgRef(): AngularFireStorageReference {
    return this.storage.ref('profile/profile-img.jpg');
  }

  /**
   * Delete an image from the database.
   *
   * @param {string} url - The project url.
   * @param {string} filename - The name of the file to be deleted.
   *
   * @returns {Promise<void>} - A promise that resolves when the image is deleted.
   */
  public deleteImage(url: string, filename: string): Promise<void> {
    return this.getProjectImgRef(url, filename).delete().toPromise();
  }

  /**
   * Download the CV.
   *
   * @param {string} language - The language of the CV to download. Only accepts 'en' or 'de'.
   *
   * @returns {Promise<boolean>} - A promise that resolves after the action is completed.
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
   *
   * @returns {Promise<boolean>} - A promise of the download action.
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
   * Get the Image downloadUrl observable.
   *
   * @param {string} projectUrl - The URL of the project.
   * @param {File | string} - File or String that contains the file name.
   *
   * @returns {Observable<string>} - The downloadURL Observable.
   */
  public getProjectImgDownloadUrl(projectUrl: string, file: File | string): Observable<string> {
    // TODO: don't need file, should only pass in filename here.
    let name: string;
    if (file instanceof File) {
      name = file.name;
    } else {
      name = file;
    }
    return this.storage.ref(`projects/${projectUrl}/${name}`).getDownloadURL();
  }

  /**
   * Upload a new version of a the CV.
   *
   * @param language - The language of the file. Either en or de.
   * @param file - The file to be uploaded
   *
   * @returns {AngularFireUploadTask} - Can be used to monitor the upload status.
   */
  public uploadCv(language: string, file: File): AngularFireUploadTask {
    return this.storage.ref(`cv/Dsouza_Austin-CV19-${language}.pdf`).put(file);
  }

  /**
   * Upload a new project logo.
   *
   * @param projectUrl - the Url id of the project.
   * @param file - The file to be uploaded
   *
   * @returns {AngularFireUploadTask} - Can be used to monitor the upload status.
   */
  public uploadProjectImg(projectUrl: string, file: File): AngularFireUploadTask {
    return this.storage.upload(`projects/${projectUrl}/${file.name}`, file);
  }

  /**
   * Upload a new profile image to be used on the home page of the main website.
   *
   * @param {File} file - the new profile image to be uploaded.
   *
   * @returns {AngularFireUploadTask} - The upload status.
   */
  public uploadProfileImg(file: File): AngularFireUploadTask {
    return this.storage.upload('profile/profile-img.jpg', file);
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
   * Get the storage reference for a project image.
   *
   * @param url - The project url.
   * @param filename - The name of the file to get.
   *
   * @returns {AngularFireStorageReference} - The storage reference for the image.
   */
  private getProjectImgRef(url: string, filename: string): AngularFireStorageReference {
    return this.storage.ref(`projects/${url}/${filename}`);
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

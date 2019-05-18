import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Projects } from '../interfaces/projects';
import { Project } from '../interfaces/project';
import * as _ from 'lodash';
import { Image } from '../interfaces/image';

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
   * @param {string} storageReference - The storage reference for the image to be deleted.
   *
   * @returns {Promise<void>} - A promise that resolves when the image is deleted.
   */
  public deleteImage(storageReference: string): Promise<void> {
    return this.storage.ref(storageReference).delete().toPromise();
  }

  /**
   * Delete all the images for each project being requested for delete.
   *
   * @param {Projects} projects - A list of projects that are being deleted from the database.
   *
   * @returns {Promise<void[]>} - Resolves when all images for the project has been deleted.
   */
  public deleteProjects(projects: Projects): Promise<void[]> {
    const deleteRequests: Promise<void>[] = [];
    _.each(projects, (project: Project) => {
      deleteRequests.push(this.deleteImage(project.logo.storageReference));
      _.each(project.images, (image: Image) => {
        deleteRequests.push(this.deleteImage(image.storageReference));
      });
    });
    return Promise.all(deleteRequests);
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
   * Get the image storage reference of where it is saved in the database.
   *
   * @param url - The URL of the project.
   * @param filename - The filename of the image.
   *
   * @returns {string} - The storage reference foe the image.
   */
  public generateImageStorageReference(url: string, filename: string): string {
    return `projects/${url}/${filename}`;
  }

  /**
   * Get the Image downloadURL observable.
   *
   * @param {string} projectUrl - The URL of the project.
   * @param {string} filename - Name of the image file.
   *
   * @returns {Observable<string>} - The downloadURL Observable.
   */
  public getProjectImgDownloadUrl(projectUrl: string, filename: string): Observable<string> {
    return this.storage.ref(`projects/${projectUrl}/${filename}`).getDownloadURL();
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
   * Get the Thesis downloadUrl observable.
   *
   * @returns {Observable<string>} - The downloadURL Observable.
   */
  private getThesisDownloadUrl(): Observable<string> {
    return this.storage.ref(`thesis/Dsouza_Austin_Togetherness-of-Strangers.pdf`).getDownloadURL();
  }
}

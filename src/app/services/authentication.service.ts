import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  /**
   * The current firebase User logged into the app.
   *
   * @returns {firebase.User} - the current user.
   */
  public get currentUser(): firebase.User {
    return this.auth.auth.currentUser;
  }

  /**
   * Ensure's the user is authenticated.
   *
   * If the user hasn't logged in, an anonymous login is created for them.
   *
   * This will allow securing the database to visitors of the website only as opposed
   * to letting it be public to other Google API's
   *
   * @returns {Promise<boolean>} - Resolves when the user is logged in.
   */
  public ensureAuthenticated(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const isLoggedIn: boolean = await this.isLoggedIn();
        if (isLoggedIn) {
          resolve(true);
        } else {
          await this.auth.auth.signInAnonymously();
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Checks if there is a user currently logged in.
   *
   * @returns {Promise<boolean>} - Indicates if the user is logged in or not.
   */
  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.auth.user.subscribe((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * Login to the app.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   *
   * @returns {firebase.auth.UserCredential} - A firebase user credential.
   */
  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Logout of the app.
   *
   * @returns {Promise<void>} - Promise resolves when the action completes.
   */
  public logout(): Promise<void> {
    return this.auth.auth.signOut();
  }

  /**
   * Update the password for the current user.
   *
   * @param {string} newPassword - The new password for the current user.
   *
   * @returns {Promise<void>} - Resolves when the password has been updated.
   */
  public updatePassword(newPassword: string): Promise<void> {
    return this.auth.auth.currentUser.updatePassword(newPassword);
  }
}

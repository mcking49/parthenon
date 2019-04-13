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
}

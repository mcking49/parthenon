import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Project } from './../interfaces/project';
import { Projects } from './../interfaces/projects';

import * as firebase from 'firebase/app';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsDoc: AngularFirestoreDocument<Projects>;
  private projects: BehaviorSubject<Projects> = new BehaviorSubject<Projects>(null);
  public projects$: Observable<Projects> = this.projects.asObservable();

  constructor(
    private afStore: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.authService.ensureAuthenticated().then((authenticated) => {
      this.projectsDoc = this.afStore.doc<Projects>('website/projects');
      this.projectsDoc.valueChanges().subscribe((projects: Projects) => {
        // Updates the local copy.
        this.projects.next(projects);
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
   * Adds a new project or updates an existing project.
   *
   * @param {Project} project - The project to be added or updated.
   *
   * @returns {Promise<void>} - A promise when the action is completed.
   */
  public addOrUpdateProject(project: Project): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.projects$.subscribe((projects: Projects) => {
        projects[project.url] = project;
        return this.projectsDoc.update(projects).then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
      }).unsubscribe();
    });
  }

  /**
   * Delete projects from the database.
   *
   * @param {string[]} urls - A list of urls of projects to be deleted.
   *
   * @returns {Promise<void>} - A promise when the action is completed.
   */
  public deleteProjects(urls: string[]): Promise<void> {
    const deletedProjects = {};
    _.each(urls, (url) => {
      deletedProjects[url] = firebase.firestore.FieldValue.delete();
    });
    return this.projectsDoc.update(deletedProjects);
  }

  /**
   * Generate a URL for the project.
   *
   * The generated URL will be in the format:
   * "year-project-title".
   * E.g. - given year=2019 and title="This is The First Project",
   * the generated URL will be: "2019-this-is-the-first-project".
   *
   * @param title - The project title.
   * @param year - The year the project was done.
   *
   * @returns {string} - The generated URL for the project.
   */
  public generateUrl(title: string, year: number): string {
    return `${year}-${title.toLowerCase().trim().replace(/\s/g, '-')}`;
  }
}

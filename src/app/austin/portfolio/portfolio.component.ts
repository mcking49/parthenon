import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Projects } from 'src/app/interfaces/projects';
import { Project } from 'src/app/interfaces/project';

import { ResponsiveService } from './../../services/responsive.service';
import { ProjectsService } from 'src/app/services/projects.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnDestroy, OnInit {

  public showLoading: boolean;
  public isHandset: Observable<boolean>;
  public projects: Project[];
  public readonly thesisLogoPath = '../../../assets/img/projects/2019-masters-thesis/main-logo.png';

  private projectsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private responsiveService: ResponsiveService,
    private router: Router
  ) { }

  ngOnDestroy() {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.initProjects();
    this.isHandset = this.responsiveService.isHandset;
  }

  /**
   * Check if the projects are still loading.
   *
   * @returns {boolean} - Returns true if the projects haven't been loaded yet.
   */
  public get isLoading(): boolean {
    return !this.projects;
  }

  /**
   * Open the selected project page.
   *
   * @param url - The URL of the project to open.
   */
  public openProject(url: string): void {
    this.router.navigate([`../project/${url}`], {relativeTo: this.activatedRoute});
  }

  /**
   * Open the thesis page.
   */
  public openThesis(): void {
    this.router.navigate(
      ['../master-thesis/2019-the-togetherness-of-strangers'],
      {relativeTo: this.activatedRoute}
    );
  }

  /**
   * Initialise the portfolio page.
   */
  private initProjects(): void {
    this.projectsSubscription = this.projectsService.projects$
      .pipe(
        map(
          (projects: Projects) => _.orderBy(_.values(projects), ['year', 'title'], ['desc', 'asc'])
        )
      )
      .subscribe(
        (projects: Project[]) => {
          if (projects) {
            this.projects = projects;
          }
        }
      );
  }

}

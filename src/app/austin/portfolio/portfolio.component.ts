import { ResponsiveService } from './../../services/responsive.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { LoadingSpinnerModalComponent } from '../../components/loading-spinner-modal/loading-spinner-modal.component';
import { Projects } from 'src/app/interfaces/projects';
import { Project } from 'src/app/interfaces/project';
import * as _ from 'lodash';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public showLoading: boolean;
  public isHandset: Observable<boolean>;
  public projects: Project[];
  public readonly thesisLogoPath = '../../../assets/img/projects/2019-masters-thesis/main-logo.png';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private projectsService: ProjectsService,
    private responsiveService: ResponsiveService,
    private router: Router,
    private storage: StorageService
  ) {
    this.projects = [];
  }

  ngOnInit() {
    this.initProjects();
    this.showLoading = false;
    this.isHandset = this.responsiveService.isHandset;
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
   * Download the Thesis from the database.
   */
  public async downloadThesis() {
    this.showLoading = true;
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px',
    });

    try {
      await this.storage.downloadThesis();
    } catch (error) {
      throw error;
    } finally {
      dialogRef.close();
      this.showLoading = false;
    }
  }

  /**
   * Initialise the portfolio page.
   */
  private initProjects(): void {
    this.projectsService.projects$.subscribe((projects: Projects) => {
      if (projects) {
        this.projects = _.values(projects);
      }
    });
  }

}

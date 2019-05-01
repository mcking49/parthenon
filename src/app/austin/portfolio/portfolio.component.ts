import { ResponsiveService } from './../../services/responsive.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingSpinnerModalComponent } from '../../components/loading-spinner-modal/loading-spinner-modal.component';
import { MatDialog } from '@angular/material';
import { ProjectsDeprecatedService, IProjectDeprecated } from 'src/app/services/projects-deprecated.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public showLoading: boolean;
  public isHandset: Observable<boolean>;
  public projects: IProjectDeprecated[];
  public readonly thesisLogoPath = '../../../assets/img/projects/2019-masters-thesis/main-logo.png';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private projectService: ProjectsDeprecatedService,
    private responsiveService: ResponsiveService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.projects = [];
    this.initProjects();
    this.showLoading = false;
    this.isHandset = this.responsiveService.isHandset;
  }

  public openProject(url: string): void {
    this.router.navigate([`../project/${url}`], {relativeTo: this.activatedRoute});
  }

  public openThesis() {
    this.router.navigate(
      ['../master-thesis/2019-the-togetherness-of-strangers'],
      {relativeTo: this.activatedRoute}
    );
  }

  public async downloadThesis() {
    this.showLoading = true;
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px',
    });
    await this.storage.downloadThesis();
    dialogRef.close();
    this.showLoading = false;
  }

  private initProjects() {
    this.projects = this.projectService.projects;
  }

}

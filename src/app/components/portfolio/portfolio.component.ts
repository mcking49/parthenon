import { ResponsiveService } from './../../services/responsive.service';
import { Component, OnInit } from '@angular/core';
import { ProjectsService, IProject } from '../../services/projects.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public isHandset: Observable<boolean>;

  public projects: IProject[] = [];

  constructor(
    private projectService: ProjectsService,
    private responsiveService: ResponsiveService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initProjects();
    this.isHandset = this.responsiveService.isHandset;
  }

  public openProject(url: string): void {
    this.router.navigateByUrl(`/project/${url}`);
  }

  private initProjects() {
    this.projects = this.projectService.projects;
  }

}

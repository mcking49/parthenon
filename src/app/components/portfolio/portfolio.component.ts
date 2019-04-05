import { Component, OnInit } from '@angular/core';
import { ProjectsService, IProject } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public projects: IProject[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectsService
  ) { }

  ngOnInit() {
    this.initProjects();
  }

  public openProject(url: string): void {
    this.router.navigate([`/project/${url}`], {fragment: 'project'});
  }

  private initProjects() {
    this.projects = this.projectService.projects;
  }

}

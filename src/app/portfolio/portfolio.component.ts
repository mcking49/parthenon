import { Component, OnInit } from '@angular/core';
import { ProjectsService, IProject } from '../projects.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public projects: IProject[] = [];

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    this.initProjects();
  }

  private initProjects() {
    this.projects = this.projectService.projects;
  }

}

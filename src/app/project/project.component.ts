import { Component, OnInit } from '@angular/core';
import { ProjectsService, IProject } from '../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  // TODO: Change this to be the project that is passed into this component.
  project: IProject;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.initProjects();
  }

  private initProjects(): void {
    this.project = this.projectsService.projects[0];
  }

}

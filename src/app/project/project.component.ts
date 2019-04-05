import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectsService, IProject } from '../services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  project: IProject;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initProjects();
  }

  private initProjects(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.project = this.projectsService.getProject(url);
  }

}

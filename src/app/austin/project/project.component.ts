import { ResponsiveService } from './../../services/responsive.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/interfaces/projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public isHandset: Observable<boolean>;
  public project: Project;

  constructor(
    private projectsService: ProjectsService,
    private responsiveService: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initProjects();
    this.isHandset = this.responsiveService.isHandset;
  }

  private initProjects(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.projectsService.projects$.subscribe((projects: Projects) => {
      if (projects) {
        this.project = projects[url];
      }
    });
  }

}

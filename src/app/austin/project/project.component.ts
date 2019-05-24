import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project';
import { Projects } from 'src/app/interfaces/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

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

  /**
   * Check if the project has a conclusion.
   *
   * @returns {boolean} - True if the project has been initialised and has at least
   * 1 conclusion paragraph.
   */
  public get hasConclusion(): boolean {
    if (this.project) {
      return this.project.conclusion && !!this.project.conclusion.length;
    } else {
      return false;
    }
  }

  /**
   * Check if the project is still loading.
   *
   * @returns {boolean} - Returns true if the project hasn't been loaded yet.
   */
  public get isLoading(): boolean {
    return !this.project;
  }

  /**
   * Initialise the project component and get the Project data
   * from the server.
   */
  private initProjects(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.projectsService.projects$.subscribe((projects: Projects) => {
      if (projects) {
        this.project = projects[url];
      }
    });
  }

}

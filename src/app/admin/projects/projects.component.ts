import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projects } from 'src/app/interfaces/projects';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public tableData: MatTableDataSource<any>;
  public tableColumns: string[] = ['year', 'title'];
  private projects: Projects;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.projectsService.projects$.subscribe((projects) => {
      if (projects) {
        this.projects = projects;
        const projectsArray =  _.map(projects, (project: Project) => {
          return _.pick(project, ['year', 'title', 'url']);
        });
        this.tableData = new MatTableDataSource(projectsArray);
      }
    });
  }

  public applyFilter(filterValue: string) {
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  public openProject(url: string): void {
    this.router.navigate([`../project/${url}`], {relativeTo: this.activatedRoute});
  }

}

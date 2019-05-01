import { ResponsiveService } from './../../services/responsive.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectsDeprecatedService, IProjectDeprecated } from '../../services/projects-deprecated.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public isHandset: Observable<boolean>;
  public project: IProjectDeprecated;

  constructor(
    private projectsDeprecatedService: ProjectsDeprecatedService,
    private responsiveService: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initProjects();
    this.isHandset = this.responsiveService.isHandset;
  }

  private initProjects(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.project = this.projectsDeprecatedService.getProject(url);
  }

}

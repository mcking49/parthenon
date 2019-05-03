import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projectsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.initialiseForm();
  }

  private initialiseForm(): void {
    this.projectsForm = this.formBuilder.group({
      title: [
        '',
        Validators.required
      ],
      year: [
        '',
        Validators.required
      ],
      category: [
        '',
        Validators.required
      ],
      brief: this.formBuilder.array([
        this.formBuilder.control(
          '',
          Validators.required
        )
      ]),
    });
  }

}

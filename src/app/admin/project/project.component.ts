import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ProjectsService } from 'src/app/services/projects.service';
import { StorageService } from './../../services/storage.service';
import { Project } from './../../interfaces/project';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public isEditingMode: boolean;
  public hasConclusion: boolean;
  public projectForm: FormGroup;
  public selectedLogo: File;
  public selectedImages: FileList;

  private project: Project;
  private projectUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private router: Router,
    private snackbar: MatSnackBar,
    private storageService: StorageService,
  ) {
    this.isEditingMode = false;
  this.hasConclusion = false;
  }

  ngOnInit() {
    this.initialiseForm();
    this.activatedRoute.params.subscribe((params) => {
      this.projectUrl = params.url;
      if (this.projectUrl === 'new') {
        this.isEditingMode = true;
      } else {
        this.projectsService.projects$.subscribe((projects) => {
          if (projects) {
            this.project = projects[this.projectUrl];
            _.each(this.project, (value: any, key: string) => {
              if (key === 'brief') {
                _.each(value, (paragraph: string, index: number) => {
                  if (index === 0) {
                    this.brief.controls[0].setValue(paragraph);
                  } else {
                    this.addBriefParagraph(index, paragraph);
                  }
                });
              } else if (key === 'conclusion') {
                if (value.length) {
                  _.each(value, (paragraph: string, index: number) => {
                    if (this.hasConclusion) {
                      this.addConclusionParagraph(index, paragraph);
                    } else {
                      this.addConclusionForm();
                      this.conclusion.controls[0].setValue(paragraph);
                    }
                  });
                }
              } else if (key === 'url') {
                return;
              } else {
                this.projectForm.controls[key].setValue(value);
              }
            });
          }
        });
      }
    });
  }

  /**
   * Get the Conclusion section from the Project form.
   *
   * @returns {FormArray} - the Conclusion section from the Project form.
   */
  public get conclusion(): FormArray {
    return this.projectForm.get('conclusion') as FormArray;
  }

  /**
   * Get the Brief section from the Project form.
   *
   * @returns {FormArray} - the Brief section from the Project form.
   */
  public get brief(): FormArray {
    return this.projectForm.get('brief') as FormArray;
  }

  /**
   * Check if element should be disabled.
   *
   * @returns {boolean} - Indicates if the element should be disabled or not.
   */
  public get isDisabled(): boolean {
    if (this.projectUrl === 'new') {
      return !this.isEditingMode || !this.projectForm.valid || this.projectForm.pristine || !this.selectedImages || !this.selectedLogo;
    } else {
      return !this.isEditingMode || !this.projectForm.valid || this.projectForm.pristine;
    }
  }

  /**
   * Check if the upload button is disabled.
   *
   * @returns {boolean} - Indicates if the upload button is disabled or not.
   */
  public get isUploadDisabled(): boolean {
    return !this.isEditingMode;
  }

  /**
   * Check if the form has a conclusion section.
   *
   * @returns {boolean} - true if there is a conclusion.
   */
  public addConclusionForm() {
    this.addConclusionParagraph(0);
    this.hasConclusion = true;
  }

  /**
   * Add a new paragraph for the conclusion.
   *
   * @param {string} paragraph - The new paragraph to be added to the conclusion.
   */
  public addConclusionParagraph(index: number, paragraph: string = ''): void {
    const formControlState: any = {
      value: paragraph,
      disabled: !this.isEditingMode
    };
    this.conclusion.insert(index, this.formBuilder.control(formControlState, Validators.required));
  }

  /**
   * Delete a paragraph from the conclusion.
   *
   * @param {number} index - The index position of the paragraph to be deleted.
   */
  public deleteConclusionParagraph(index: number): void {
    this.conclusion.removeAt(index);
    if (!this.conclusion.length) {
      this.hasConclusion = false;
    }
  }

  /**
   * Add a new paragraph for the brief.
   *
   * @param {string} paragraph - The new paragraph to be added to the brief.
   */
  public addBriefParagraph(index: number, paragraph: string = ''): void {
    const formControlState: any = {
      value: paragraph,
      disabled: !this.isEditingMode
    };
    this.brief.insert(index, this.formBuilder.control(formControlState, Validators.required));
  }

  /**
   * Delete a paragraph from the brief.
   *
   * @param {number} index - The index position of the paragraph to be deleted.
   */
  public deleteBriefParagraph(index: number): void {
    this.brief.removeAt(index);
  }

  /**
   * Store the new selected images.
   *
   * @param files - The list of files that have been selected.
   */
  public newImagesSelected(files: FileList) {
    this.selectedImages = files;
  }

  /**
   * Store the new selected logo.
   *
   * @param files - The list of files that have been selected.
   */
  public newLogoSelected(files: FileList) {
    this.selectedLogo = files.item(0);
  }

  /**
   * Save the project to the database.
   */
  public submitForm(): void {
    if (
      (this.selectedLogo || this.projectForm.get('logoUrl').value)
      && (this.selectedImages || this.projectForm.get('imageUrls').value.length)
      && this.projectForm.valid
    ) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      let totalImages = this.selectedImages ? this.selectedImages.length : 0;
      if (this.selectedLogo) {
        totalImages++;
      }
      let uploadedImages = 0;
      const project = {
        url: this.projectsService.generateUrl(
          this.projectForm.get('title').value,
          this.projectForm.get('year').value as number
        )
      };

      if (this.selectedLogo || this.selectedImages) {
        if (this.selectedLogo) {
          this.storageService.uploadProjectImg(project.url, this.selectedLogo).snapshotChanges().pipe(
            finalize(async () => {
              const url: string = await this.storageService.getProjectImgDownloadUrl(project.url, this.selectedLogo).toPromise();
              this.projectForm.get('logoUrl').setValue(url);
              uploadedImages++;
              if (uploadedImages === totalImages) {
                this.saveForm(project, dialogRef);
              }
            })
          ).subscribe();
        }

        if (this.selectedImages) {
          _.each(this.selectedImages, (img) => {
            this.storageService.uploadProjectImg(project.url, img).snapshotChanges().pipe(
              finalize(async () => {
                const url: string = await this.storageService.getProjectImgDownloadUrl(project.url, img).toPromise();
                const images: string[] = this.projectForm.get('imageUrls').value;
                images.push(url);
                this.projectForm.get('imageUrls').setValue(images);
                uploadedImages++;
                if (uploadedImages === totalImages) {
                  this.saveForm(project, dialogRef);
                }
              })
            ).subscribe();
          });
        }
      } else {
        this.saveForm(project, dialogRef);
      }
    } else {
      throw new Error('The form is invalid');
    }
  }

  /**
   * Toggle the editing state of the form.
   */
  public toggleEditingState(): void {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.projectForm.controls, (value: any, key: string) => {
        this.projectForm.controls[key].enable();
      });
    } else {
      this.resetForm();
    }
  }

  private initialiseForm(): void {
    this.projectForm = this.formBuilder.group({
      title: [
        {
          value: '',
          disabled: !this.isEditingMode
        },
        Validators.required
      ],
      category: [
        {
          value: '',
          disabled: !this.isEditingMode
        },
        Validators.required
      ],
      year: [
        {
          value: '',
          disabled: !this.isEditingMode
        },
        Validators.required
      ],
      brief: this.formBuilder.array([
        this.formBuilder.control(
          {
            value: '',
            disabled: !this.isEditingMode
          },
          Validators.required
        )
      ]),
      logoUrl: [
        ''
      ],
      imageUrls: [
        []
      ],
      conclusion: this.formBuilder.array([]),
    });
  }

  /**
   * Save the project to the database.
   *
   * @param project - A blank project object that contains a url.
   * @param dialogRef - The loading dialog reference.
   */
  private async saveForm(project: any, dialogRef: MatDialogRef<LoadingSpinnerModalComponent, any>) {
    _.map(this.projectForm.controls, (formControl: FormControl, key: string) => {
      if (key === 'brief') {
        project[key] = _.map(this.brief.controls, 'value');
      } else if (key === 'conclusion') {
        project[key] = _.map(this.conclusion.controls, 'value');
      } else {
        project[key] = formControl.value;
      }
    });

    try {
      await this.projectsService.addOrUpdateProject(project as Project);

      // If the year or title changes, this creates a new project in the database
      // because the url will be different. This means the old url and now outdated project
      // still exists in the database so we should delete it. We don't need to wait for this
      // action to complete so we can ignore waiting for the promise to resolve and let the delete
      // finish in the background.
      if (this.projectUrl !== project.url) {
        this.projectsService.deleteProjects([this.projectUrl]);
      }

      this.resetForm();
      await this.router.navigate(['../../projects'], {relativeTo: this.activatedRoute});
      this.snackbar.open(
        'Your project has been saved',
        'Close',
        {
          duration: 3000,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      dialogRef.close();
    }
  }

  /**
   * Reset the form to it's initial states with default values.
   */
  private resetForm(): void {
    const isNewProject = this.projectUrl === 'new' ? true : false;
    this.brief.controls = [];
    this.conclusion.controls = [];
    this.brief.reset();
    this.conclusion.reset();
    this.selectedImages = null;
    this.selectedLogo = null;
    this.projectForm.reset({
      title: {
        value: isNewProject ? '' : this.project.title,
        disabled: !this.isEditingMode
        },
      category: {
        value: isNewProject ? '' : this.project.category,
        disabled: !this.isEditingMode
        },
      year: {
        value: isNewProject ? '' : this.project.year,
        disabled: !this.isEditingMode
        },
      brief: this.formBuilder.array([]),
      logoUrl: {
        value: isNewProject ? '' : this.project.logoUrl,
        disabled: !this.isEditingMode
        },
      imageUrls: {
        value: isNewProject ? [] : this.project.imageUrls,
        disabled: !this.isEditingMode
        },
      conclusion: this.formBuilder.array([])
    });

    if (!isNewProject) {
      _.each(this.project.brief, (paragraph: string, index: number) => {
        this.addBriefParagraph(index, paragraph);
      });
      if (this.project.conclusion && this.project.conclusion.length) {
        this.hasConclusion = true;
        _.each(this.project.conclusion, (paragraph: string, index: number) => {
          this.addConclusionParagraph(index, paragraph);
        });
      }
    } else {
      this.addBriefParagraph(0);
    }
  }

}

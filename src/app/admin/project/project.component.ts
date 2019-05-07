import { ActivatedRoute } from '@angular/router';
import { Project } from './../../interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { StorageService } from './../../services/storage.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

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
  public newProject: boolean;

  private project: Project;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) {
    this.isEditingMode = false;
    this.hasConclusion = false;
    this.newProject = false;
  }

  ngOnInit() {
    this.initialiseForm();
    this.route.params.subscribe((params) => {
      if (params.url === 'new') {
        this.newProject = true;
        this.isEditingMode = true;
      } else {
        this.projectsService.projects$.subscribe((projects) => {
          if (projects) {
            this.project = projects[params.url];
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
                    if (!this.hasConclusion) {
                      this.addConclusionForm();
                      this.conclusion.controls[0].setValue(paragraph);
                    } else {
                      this.addConclusionParagraph(index, paragraph);
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
    if (this.newProject) {
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
    if (index == 0) {
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
    if (this.selectedLogo && this.selectedImages && this.projectForm.valid) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      const totalImages = this.selectedImages.length + 1;
      let uploadedImages = 0;
      const project = {
        url: this.projectsService.generateUrl(
          this.projectForm.get('title').value,
          this.projectForm.get('year').value as number
        )
      };

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
      this.resetForm();
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
    this.brief.controls = [];
    this.conclusion.controls = [];
    this.brief.reset();
    this.conclusion.reset();
    this.addBriefParagraph(0);
    this.selectedImages = null;
    this.selectedLogo = null;
    this.projectForm.reset({
      title: '',
      category: '',
      year: '',
      brief: this.formBuilder.array([
        this.formBuilder.control(
          '',
          Validators.required
        )
      ]),
      logoUrl: '',
      imageUrls: [],
      conclusion: this.formBuilder.array([])
    });
  }

}

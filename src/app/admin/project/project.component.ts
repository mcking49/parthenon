import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ProjectsService } from 'src/app/services/projects.service';
import { StorageService } from './../../services/storage.service';
import { Image } from './../../interfaces/image';
import { Project } from './../../interfaces/project';
import { Projects } from 'src/app/interfaces/projects';
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
  public newProject: boolean;
  public project: Project;
  public projectForm: FormGroup;
  public projectUrl: string;
  public selectedLogo: File;
  public selectedImages: FileList;

  public showLogoPlaceholder: boolean;
  private logoRequestedForDelete: Image;
  private imagesRequestedForDelete: Image[];

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
    this.newProject = false;
    this.showLogoPlaceholder = false;
    this.imagesRequestedForDelete = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.projectUrl = params.url;
      if (this.projectUrl === 'new') {
        this.isEditingMode = true;
        this.newProject = true;
        this.createForm();
      } else {
        this.createForm();
        this.projectsService.projects$.subscribe((projects: Projects) => {
          if (projects) {
            const project: Project = projects[this.projectUrl];
            _.each(project, (value: any, key: string) => {
              const needToUpdate: boolean = !this.project || this.project[key] !== project[key];
              switch (key) {
                case 'brief': {
                  if (needToUpdate) {
                    if (this.project) {
                      this.brief.controls = [];
                      this.brief.reset();
                      this.addBriefParagraph(0);
                    }
                    _.each(value, (paragraph: string, index: number) => {
                      if (index === 0) {
                        this.brief.controls[0].setValue(paragraph);
                      } else {
                        this.addBriefParagraph(index, paragraph);
                      }
                    });
                  }
                  break;
                }
                case 'conclusion': {
                  if (needToUpdate) {
                    if (this.project) {
                      this.conclusion.controls = [];
                      this.conclusion.reset();
                    }
                    if (value.length) {
                      _.each(value, (paragraph: string, index: number) => {
                        if (this.hasConclusion) {
                          this.addConclusionParagraph(index, paragraph);
                        } else {
                          this.addConclusionForm();
                          this.conclusion.controls[0].setValue(paragraph);
                        }
                      });
                    } else {
                      this.hasConclusion = false;
                    }
                  }
                  break;
                }
                case 'url': {
                  break;
                }
                default: {
                  this.projectForm.controls[key].setValue(value);
                  break;
                }
              }
            });
            this.project = project;
          }
        });
      }
    }).unsubscribe();
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
    if (!this.conclusion.length) {
      this.hasConclusion = false;
    }
  }

  /**
   * Delete an image from the project.
   *
   * @param {Image} image - The image to be deleted.
   */
  public deleteImage(image: Image): void {
    this.imagesRequestedForDelete.push(image);
    this.project.images = _.remove(this.project.images, (data: Image) => {
      return data !== image;
    });
    this.projectForm.get('images').setValue(this.project.images);
    this.projectForm.markAsDirty();
  }

  /**
   * Delete the project logo.
   */
  public deleteLogo(): void {
    this.showLogoPlaceholder = true;
    this.logoRequestedForDelete = this.project.logo;
    this.project.logo = null;
    this.projectForm.get('logo').setValue('');
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
  public async newImagesSelected(files: FileList) {
    this.selectedImages = files;

    if (!this.newProject) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      if (this.imagesRequestedForDelete && this.imagesRequestedForDelete.length) {
        const imagesToDeletePromises = [];
        _.each(this.imagesRequestedForDelete, (image: Image) => {
          imagesToDeletePromises.push(this.storageService.deleteImage(this.projectUrl, image.filename));
        });
        await Promise.all(imagesToDeletePromises);
      }

      const images: Image[] = this.project.images;
      let uploadedImages = 0;
      const totalImages = this.selectedImages.length;
      // TODO: investigate using Promise.all here instead of uploadImages++ counter.
      _.each(this.selectedImages, (img: File) => {
        this.storageService.uploadProjectImg(this.projectUrl, img).snapshotChanges().pipe(
          finalize(() => {
            this.storageService.getProjectImgDownloadUrl(this.project.url, img).toPromise()
              .then((url: string) => {
                const image: Image = {
                  filename: img.name,
                  url: url
                };
                images.push(image);
                this.projectForm.get('images').setValue(images);
                uploadedImages++;
                if (uploadedImages === totalImages) {
                  this.project.images = images;
                  this.updateImages(dialogRef);
                }
              })
              .catch((error) => {
                throw error;
              });
          })
        ).subscribe();
      });
    }
  }

  /**
   * Store the new selected logo.
   *
   * @param files - The list of files that have been selected.
   */
  public newLogoSelected(files: FileList): void {
    this.selectedLogo = files.item(0);
    if (this.logoRequestedForDelete) {
      this.updateLogo();
    }
  }

  /**
   * Save the project to the database.
   */
  public submitForm(): void {
    if (
      (this.selectedLogo || this.projectForm.get('logo').value)
      && (this.selectedImages || this.projectForm.get('images').value.length)
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
              const logo: Image = {
                filename: this.selectedLogo.name,
                url: url
              };
              this.projectForm.get('logo').setValue(logo);
              uploadedImages++;
              if (uploadedImages === totalImages) {
                this.saveForm(project, dialogRef);
              }
            })
          ).subscribe();
        }

        if (this.selectedImages) {
          this.projectForm.get('images').setValue([]);
          _.each(this.selectedImages, (img: File) => {
            this.storageService.uploadProjectImg(project.url, img).snapshotChanges().pipe(
              finalize(async () => {
                const url: string = await this.storageService.getProjectImgDownloadUrl(project.url, img).toPromise();
                const images: Image[] = this.projectForm.get('images').value;
                const image: Image = {
                  filename: img.name,
                  url: url
                };
                images.push(image);
                this.projectForm.get('images').setValue(images);
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

  private createForm(): void {
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
      logo: [
        ''
      ],
      images: [
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
      switch (key) {
        case 'brief': {
          project[key] = _.map(this.brief.controls, 'value');
          break;
        }
        case 'conclusion': {
          project[key] = _.map(this.conclusion.controls, 'value');
          break;
        }
        default: {
          project[key] = formControl.value;
          break;
        }
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
   * Update the logo for the project.
   */
  private updateLogo(): void {
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px'
    });

    // Delete the old logo from the database if the new logo filename is different to the old logo filename.
    if (this.selectedLogo.name !== this.logoRequestedForDelete.filename) {
      // Check filename of old logo doesn't match filename of a project image
      let imageExists = false;
      _.each(this.project.images, (image) => {
        if (this.logoRequestedForDelete.filename === image.filename) {
          imageExists = true;
        }
      });
      if (!imageExists) {
        // We don't need to wait for image to delete so let this action happen in the background.
        this.storageService.deleteImage(this.project.url, this.logoRequestedForDelete.filename)
          .catch((error) => {
            throw error;
          })
          .finally(() => {
            this.logoRequestedForDelete = null;
          });
      }
    }

    this.storageService.uploadProjectImg(this.project.url, this.selectedLogo).snapshotChanges().pipe(
      finalize(async () => {
        try {
          const url: string = await this.storageService.getProjectImgDownloadUrl(this.project.url, this.selectedLogo).toPromise();
          const logo: Image = {
            filename: this.selectedLogo.name,
            url: url
          };
          this.project.logo = logo;
          await this.projectsService.addOrUpdateProject(this.project);
          this.showLogoPlaceholder = false;
        } catch (error) {
          throw error;
        } finally {
          this.selectedLogo = null;
          dialogRef.close();
        }
      })
    ).subscribe();
  }

  /**
   * Update the images for the project.
   *
   * @param {MatDialogRef<LoadingSpinnerModalComponent, any>} dialogRef - The loading component.
   */
  private async updateImages(dialogRef: MatDialogRef<LoadingSpinnerModalComponent, any>) {
    try {
      await this.projectsService.addOrUpdateProject(this.project);
    } catch (error) {
      throw error;
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
    this.selectedImages = null;
    this.selectedLogo = null;
    this.projectForm.reset({
      title: {
        value: this.newProject ? '' : this.project.title,
        disabled: !this.isEditingMode
      },
      category: {
        value: this.newProject ? '' : this.project.category,
        disabled: !this.isEditingMode
      },
      year: {
        value: this.newProject ? '' : this.project.year,
        disabled: !this.isEditingMode
      },
      brief: this.formBuilder.array([]),
      logo: {
        value: this.newProject ? '' : this.project.logo,
        disabled: !this.isEditingMode
      },
      images: {
        value: this.newProject ? [] : this.project.images,
        disabled: !this.isEditingMode
      },
      conclusion: this.formBuilder.array([])
    });

    if (!this.newProject) {
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
      this.hasConclusion = false;
    }
  }

}

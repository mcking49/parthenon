import { Component, OnInit } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { Image } from 'src/app/interfaces/image';
import { Project } from 'src/app/interfaces/project';
import { Projects } from 'src/app/interfaces/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { StorageService } from 'src/app/services/storage.service';

import * as _ from 'lodash';

type ImageTypes = 'project-image' | 'project-logo';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public hasConclusion: boolean;
  public isEditingMode: boolean;
  public newProject: boolean;
  public project: Project;
  public projectForm: FormGroup;
  public projectUrl: string;
  public selectedImages: FileList;
  public selectedLogo: File;
  public showLogoPlaceholder: boolean;

  private imagesRequestedForDelete: Image[];
  private loadingConfig: MatDialogConfig<any>;
  private logoRequestedForDelete: Image;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private router: Router,
    private snackbar: MatSnackBar,
    private storageService: StorageService
  ) {
    this.isEditingMode = false;
    this.hasConclusion = false;
    this.newProject = false;
    this.showLogoPlaceholder = false;
    this.imagesRequestedForDelete = [];
    this.loadingConfig = {
      height: '150px',
      width: '150px'
    };
  }

  ngOnInit() {
    this.projectUrl = this.activatedRoute.snapshot.paramMap.get('url');
    if (this.projectUrl === 'new') {
      this.isEditingMode = true;
      this.newProject = true;
      this.createForm();
    } else {
      // When editing an already existing project.
      this.createForm();
      this.getProject();
    }
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
   * Check if the form is in a valid state and can be saved.
   *
   * @returns {boolean} - True if the form can be saved.
   */
  public get canSave(): boolean {
    if (this.newProject) {
      return this.isEditingMode && this.projectForm.valid && this.projectForm.dirty && !!this.selectedImages && !!this.selectedLogo;
    } else {
      return this.isEditingMode && this.projectForm.valid && this.projectForm.dirty;
    }
  }

  /**
   * Check if a brief paragraph can be deleted.
   *
   * A project must have a bried which means there must be at least 1
   * brief paragraph.
   *
   * @returns {boolean} - True if the brief paragraph can be deleted.
   */
  public get canDeleteBriefParagraph(): boolean {
    return this.brief.length > 1;
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
   * Add a new paragraph for the brief.
   *
   * @param {number} number - The index position of where the paragraph should be added in the array.
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
   * Add a conclusion section to the form.
   */
  public addConclusionForm(): void {
    this.addConclusionParagraph(0);
    this.hasConclusion = true;
  }

  /**
   * Add a new paragraph for the conclusion.
   *
   * @param {number} number - The index position of where the paragraph should be added in the array.
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
   * Delete a paragraph from the brief.
   *
   * @param {number} index - The index position of the paragraph to be deleted.
   */
  public deleteBriefParagraph(index: number): void {
    this.brief.removeAt(index);
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
   * Store the new selected images.
   *
   * If you are editing an existing project, the newly selected images will automatically start saving
   * and the project will be saved as well.
   *
   * @param files - The list of files that have been selected.
   */
  public async newImagesSelected(files: FileList) {
    // Validate all the files that have been selected.
    const fileTypeValidator: RegExp = /^(image)\/((png)|(jpg)|(jpeg))$/;
    const validatedFiles = _.mapValues(files, (file: File) => {
      return fileTypeValidator.test(file.type);
    });
    const filesFailedValidaton: boolean[] = _.filter(validatedFiles, (filePassedValidation: boolean) => {
      return !filePassedValidation;
    });

    if (!filesFailedValidaton.length) {
      this.selectedImages = files;
      if (!this.newProject) {
        const loading = this.dialog.open(LoadingSpinnerModalComponent, this.loadingConfig);

        // Upload new images then save the project.
        try {
          // Delete any images that have been requested for delete.
          if (this.imagesRequestedForDelete && this.imagesRequestedForDelete.length) {
            await Promise.all(this.deleteImages());
          }

          // Upload and save new images.
          const uploadedImages = await this.uploadImages(this.selectedImages, this.projectUrl, 'project-image');
          const urls = await uploadedImages.downloadUrlPromise;
          const images: Image[] = _.concat(
            this.project.images,
            this.generateImages(urls, uploadedImages.filenames, this.projectUrl
          ));
          this.project.images = images;
          await this.projectsService.addOrUpdateProject(this.project);
          this.showSavedSnackbar();
          this.selectedImages = null;
        } catch (error) {
          let message: string;
          if (error.code === 'permission-denied') {
            message = `Authentication error: ${error.message}`;
          } else {
            message = 'ERROR: An error has occured. Please refresh and try again.';
            console.error(error);
          }
          this.showErrorSnackbar(message);
        } finally {
          this.imagesRequestedForDelete = [];
          loading.close();
        }
      }
    } else {
      this.showErrorSnackbar('Some invalid files selected. Please only select .png, .jpg or .jpeg images');
    }
  }

  /**
   * Store the new selected logo.
   *
   * @param files - The list of files that have been selected.
   */
  public async newLogoSelected(files: FileList) {
    const file: File = files.item(0);
    const fileTypeValidator: RegExp = /^(image)\/((png)|(jpg)|(jpeg))$/;
    if (fileTypeValidator.test(file.type)) {
      this.selectedLogo = file;
      if (this.logoRequestedForDelete) {
        const loading = this.dialog.open(LoadingSpinnerModalComponent, this.loadingConfig);

        // Delete the existing logo then upload the new logo.
        try {
          await this.storageService.deleteImage(this.logoRequestedForDelete.storageReference);
          const uploadedImages = await this.uploadImages([this.selectedLogo], this.projectUrl, 'project-logo');
          const urls = await uploadedImages.downloadUrlPromise;
          this.project.logo = this.generateImages(urls, uploadedImages.filenames, this.projectUrl)[0];
          await this.projectsService.addOrUpdateProject(this.project);
          this.showSavedSnackbar();
          this.selectedLogo = null;
          this.showLogoPlaceholder = false;
          this.logoRequestedForDelete = null;
        } catch (error) {
          let message: string;
          if (error.code === 'permission-denied') {
            message = `Authentication error: ${error.message}`;
          } else {
            message = 'ERROR: An error has occured. Please refresh and try again.';
            console.error(error);
          }
          this.showErrorSnackbar(message);
        } finally {
          loading.close();
        }
      }
    } else {
      this.showErrorSnackbar('Invalid file type. Please select a .png, .jpg or .jpeg image');
    }
  }

  /**
   * Request to delete an image from the project.
   *
   * The image will be deleted when the project is saved.
   *
   * @param {Image} image - The image to be deleted.
   */
  public requestToDeleteImage(image: Image): void {
    this.imagesRequestedForDelete.push(image);
    this.project.images = _.remove(this.project.images, (data: Image) => {
      return data !== image;
    });
    this.projectForm.get('images').setValue(this.project.images);
    this.projectForm.markAsDirty();
  }

  /**
   * Request to delete the project logo.
   *
   * The logo will be deleted when a new logo has been selected.
   */
  public requestToDeleteLogo(): void {
    this.showLogoPlaceholder = true;
    this.logoRequestedForDelete = this.project.logo;
    this.project.logo = null;
  }

  /**
   * Save the project to the database.
   */
  public async submitForm() {
    if (
      (this.selectedLogo || this.projectForm.get('logo').value)
      && (this.selectedImages || this.projectForm.get('images').value.length)
      && this.projectForm.valid
    ) {
      const loading = this.dialog.open(LoadingSpinnerModalComponent, this.loadingConfig);
      const project = {
        url: this.projectsService.generateUrl(
          this.projectForm.get('title').value,
          this.projectForm.get('year').value as number
        )
      };

      // Upload images
      try {
        if (this.newProject) {
          // await this.createProjectImages(project.url);
          const uploadPromises: Promise<any>[] = [
            this.uploadImages([this.selectedLogo], project.url, 'project-logo'),
            this.uploadImages(this.selectedImages, project.url, 'project-image')
          ];
          if (uploadPromises.length) {
            const uploadedImages: any[] = await Promise.all(uploadPromises);
            const getAllDownloadUrls: Promise<string[]>[] = [];
            _.each(uploadedImages, (value: any) => {
              getAllDownloadUrls.push(value.downloadUrlPromise);
            });
            const downloadUrls: Array<string[]> = await Promise.all(getAllDownloadUrls);
            _.each(downloadUrls, (value: string[], index: number) => {
              switch (uploadedImages[index].imageType) {
                case 'project-logo': {
                  const logo = this.generateImages(value, uploadedImages[index].filenames, project.url)[0];
                  this.projectForm.get('logo').setValue(logo);
                  break;
                }
                case 'project-image': {
                  const images = this.generateImages(value, uploadedImages[index].filenames, project.url);
                  this.projectForm.get('images').setValue(images);
                  break;
                }
                default: {
                  throw new Error('Unknown project image type.');
                }
              }
            });
          }

        } else {
          // Delete any images that have been requested for delete.
          if (this.imagesRequestedForDelete && this.imagesRequestedForDelete.length) {
            await Promise.all(this.deleteImages());
          }
        }

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
        this.showSavedSnackbar();
      } catch (error) {
        let message: string;
        if (error.code === 'permission-denied') {
          message = `Authentication error: ${error.message}`;
        } else {
          message = 'ERROR: An error has occured. Please refresh and try again.';
          console.error(error);
        }
        this.showErrorSnackbar(message);
      } finally {
        loading.close();
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

  /**
   * Create the project form with default values.
   */
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
   * Delete images that have been requested for deletion, from the database.
   *
   * @returns {Promise<void>[]} - A list of deletion requests.
   */
  private deleteImages(): Promise<void>[] {
    const imagesToDeletePromises: Promise<void>[] = [];
    _.each(this.imagesRequestedForDelete, (image: Image) => {
      imagesToDeletePromises.push(this.storageService.deleteImage(image.storageReference));
    });
    return imagesToDeletePromises;
  }

  /**
   * Generate a list of Images.
   *
   * @param {string} downloadUrls - A list of image download URL's.
   * @param {string[]} filenames - A list of filenames for each image with the same index.
   * @param {string} projectUrl - The URL for the project the images belong to.
   *
   * @returns {Image[]} - An Image object array.
   */
  private generateImages(downloadUrls: string[], filenames: string[], projectUrl: string): Image[] {
    const images: Image[] = [];
    _.each(downloadUrls, (url: string, index: number) => {
      const image: Image = {
        filename: filenames[index],
        url: url,
        storageReference: this.storageService.generateImageStorageReference(projectUrl, filenames[index])
      };
      images.push(image);
    });
    return images;
  }

  /**
   * Get the project to edit.
   */
  private getProject(): void {
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

  /**
   * Shows a snackbar informing that an error has occured.
   *
   * @param {string} message - The error message to display.
   */
  private showErrorSnackbar(message: string): void {
    this.snackbar.open(
      message,
      'Close',
      {duration: 5000}
    );
  }

  /**
   * Shows a snackbar informing the project has been saved.
   */
  private showSavedSnackbar(): void {
    this.snackbar.open(
      'Your project has been saved',
      'Close',
      {duration: 3000}
    );
  }

  /**
   * Upload images to the database.
   *
   * @param {FileList | File[]} imagesToUpload - A list of Files (images) to upload.
   * @param {string} projectUrl - The URL of the project the images will belong to.
   * @param {ImageTypes} imageType - The type of the image ('project-logo' or 'project-images').
   *
   * @returns {Promise<any>} - Resolves when images have been uploaded and returns a promise
   * that will resolve the download urls for those images, and returns the filenames of those images, in order.
   */
  private uploadImages(imagesToUpload: FileList | File[], projectUrl: string, imageType: ImageTypes): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const uploadPromises: Promise<UploadTaskSnapshot>[] = [];
      _.each(imagesToUpload, (image: File) => {
        uploadPromises.push(this.storageService.uploadProjectImg(projectUrl, image).snapshotChanges().toPromise());
      });

      try {
        const snapshots: UploadTaskSnapshot[] = await Promise.all(uploadPromises);
        const downloadUrlPromises: Promise<string>[] = [];
        const filenames: string[] = [];
        _.each(snapshots, (snapshot: UploadTaskSnapshot) => {
          downloadUrlPromises.push(this.storageService.getProjectImgDownloadUrl(projectUrl, snapshot.ref.name).toPromise());
          filenames.push(snapshot.ref.name);
        });

        const images: any = {
          downloadUrlPromise: Promise.all(downloadUrlPromises),
          filenames,
          imageType
        };

        resolve(images);
      } catch (error) {
        reject(error);
      }
    });
  }

}

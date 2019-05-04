import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.isEditingMode = true;
    this.hasConclusion = false;
  }

  ngOnInit() {
    this.initialiseForm();
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
    return !this.isEditingMode || !this.projectForm.valid || this.projectForm.pristine;
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
    console.log('submit form pressed');
  }

  /**
   * Toggle the editing state of the form.
   */
  public toggleEditingState(): void {
    this.isEditingMode = !this.isEditingMode;
  }

  private initialiseForm(): void {
    this.projectForm = this.formBuilder.group({
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
      logo: [
        null,
        Validators.required
      ],
      images: [
        null,
        Validators.required
      ],
      conclusion: this.formBuilder.array([]),
    });
  }

}

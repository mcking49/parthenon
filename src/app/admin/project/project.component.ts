import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public isEditingMode: boolean;
  public projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.isEditingMode = true;
  }

  ngOnInit() {
    this.initialiseForm();
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
   * Check if element should be disabled.
   *
   * @returns {boolean} - Indicates if the element should be disabled or not.
   */
  public get isDisabled(): boolean {
    return !this.isEditingMode || !this.projectForm.valid || this.projectForm.pristine;
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
    });
  }

}

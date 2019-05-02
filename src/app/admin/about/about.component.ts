import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AboutService } from './../../services/about.service';
import { About } from './../../interfaces/about';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public isEditingMode: boolean;
  private isFirstTimeLoad: boolean;

  public aboutForm: FormGroup;
  // Keep a reference of the about content to make reseting the form easier.
  private defaultParagraphs: string[];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private snackbar: MatSnackBar
  ) {
    this.isEditingMode = false;
    this.isFirstTimeLoad = true;
  }

  ngOnInit() {
    this.aboutForm = this.formBuilder.group({
      paragraphs: this.formBuilder.array([])
    });
    this.aboutService.about$.subscribe((about: About) => {
      if (about) {
        if (this.isFirstTimeLoad) {
          this.isFirstTimeLoad = false;
        } else {
          this.snackbar.open(
            'The about content has been refreshed',
            'Close',
            {
              duration: 3000,
            }
          );
        }
        this.defaultParagraphs = about.paragraphs;
        this.resetForm();
      }
    });
  }

  /**
   * Check if element should be disabled.
   *
   * @returns {boolean} - Indicates if the element should be disabled or not.
   */
  public get isDisabled(): boolean {
    return !this.isEditingMode || !this.aboutForm.valid || this.aboutForm.pristine;
  }

  /**
   * Get the paragraphs FormArray from the FormGroup.
   *
   * @returns {FormArray} - The paragraphs FormArray from the FormGroup.
   */
  public get paragraphs(): FormArray {
    return this.aboutForm.get('paragraphs') as FormArray;
  }

  /**
   * Save the new values to the database.
   */
  public async submitForm() {
    if (this.aboutForm.valid) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      const updatedParagraphs: string[] = _.map(this.paragraphs.controls, 'value');
      const updatedAbout: About = {
        paragraphs: updatedParagraphs
      };

      try {
        this.isFirstTimeLoad = true;
        await this.aboutService.updateAbout(updatedAbout);
        this.toggleEditingState();
        this.snackbar.open(
          'The changes have been saved',
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
    } else {
      console.error('Form is invalid.');
    }
  }

  /**
   * Add a new paragraph to the paragraphs FormArray.
   *
   * @param {string} paragraph - The new paragraph to be added to the paragraphs FormArray.
   */
  public addParagraph(paragraph: string = ''): void {
    const formControlState: any = {
      value: paragraph,
      disabled: !this.isEditingMode
    };
    this.paragraphs.push(this.formBuilder.control(formControlState, Validators.required));
  }

  /**
   * Delete a paragraph.
   *
   * @param {number} index - The index position of the paragraph to be deleted.
   */
  public deleteParagraph(index: number): void {
    this.paragraphs.removeAt(index);
  }

  /**
   * Toggle the editing state of the form.
   */
  public toggleEditingState(): void {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.paragraphs.controls, (control: FormControl) => {
        control.enable();
      });
    } else {
      this.resetForm();
    }
  }

  /**
   * Reset the form to it's initial states with default values.
   */
  private resetForm(): void {
    this.aboutForm.reset();
    this.paragraphs.reset();
    this.paragraphs.controls = [];

    _.each(this.defaultParagraphs, (paragraph: string) => {
      this.addParagraph(paragraph);
    });
  }

}

import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  public isEditingMode: boolean = false;
  public aboutForm: FormGroup;

  private serverAboutForm: any;
  private isFirstTimeLoad: boolean = true;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.aboutForm = this.formBuilder.group({});
    this.aboutService.getAbout().subscribe((about: About) => {
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
      this.serverAboutForm = {};
      this.resetForm(!this.isEditingMode);
      _.each(about.paragraphs, (paragraph: string) => {
        this.addParagraphSection(paragraph, true);
      });
    });
  }

  public get aboutFormControlKeys(): string[] {
    return Object.keys(this.aboutForm.controls);
  }

  public get isDisabled(): boolean {
    return !this.isEditingMode || !this.aboutForm.valid || this.aboutForm.pristine;
  }

  public async submitForm() {
    if (this.aboutForm.valid) {
      const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        maxHeight: '150px',
        height: '150px',
        width: '150px'
      });

      let updatedAbout: About = {
        paragraphs: []
      };
      _.each(this.aboutForm.controls, (formControl: FormControl) => {
        updatedAbout.paragraphs.push(formControl.value);
      });

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

  public addParagraphSection(value: string = '', loadedFromServer?: boolean, formControlName?: string): void {
    // create a random number to add to the formcontrol name to ensure uniqueness.
    if (!formControlName) {
      const randNum: string = (Math.random() * Math.floor(10000)).toString();
      formControlName = `paragraph${new Date().getTime().toString()}${randNum}`;
    }
    const formControlOptions: any = {
      value,
      disabled: !this.isEditingMode
    };
    if (loadedFromServer) {
      this.serverAboutForm[formControlName] = value;
    }
    this.aboutForm.addControl(formControlName, new FormControl(formControlOptions, Validators.required));
  }

  public deleteParagraphSection(formControlName: string): void {
    this.aboutForm.removeControl(formControlName);
  }

  public toggleEditingState() {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      _.each(this.aboutForm.controls, (value: any, key: string) => {
        this.aboutForm.controls[key].enable();
      });
    } else {
      this.resetForm(true);
    }
  }

  /**
   * Reset the form to it's initial states with default values.
   *
   * @param {boolean} disableFields - Disable the fields after reseting the form.
   */
  private resetForm(disableFields?: boolean): void {
    this.aboutForm.reset();
    this.aboutForm.controls = {};
    _.each(this.serverAboutForm, (value: string, key: string) => {
      this.addParagraphSection(value, false, key);
      if (disableFields) {
        this.aboutForm.controls[key].disable();
      }
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectsService } from 'src/app/services/projects.service';
import { StorageService } from './../../services/storage.service';
import { Project } from 'src/app/interfaces/project';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';
import { ConfirmDeleteComponent } from 'src/app/components/confirm-delete/confirm-delete.component';
import * as _ from 'lodash';
import { Projects } from 'src/app/interfaces/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public tableData: MatTableDataSource<any>;
  public selection: SelectionModel<any>;

  public tableColumns: string[] = ['select', 'year', 'title', 'category'];

  private projects: Projects;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private projectsService: ProjectsService,
    private storageService: StorageService
  ) {
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit() {
    this.projectsService.projects$.subscribe((projects) => {
      if (projects) {
        this.projects = projects;
        const projectsArray = _.map(projects, (project: Project) => {
          return _.pick(project, ['year', 'title', 'category', 'url']);
        });
        this.tableData = new MatTableDataSource(projectsArray);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
      }
    });
  }

  /**
   * The currently selected projects in the table.
   *
   * @returns {any[]} - An array of selected projects.
   */
  public get selectedProjects(): any[] {
    return this.selection.selected;
  }

  /**
   * Filter the table of projects.
   *
   * @param filterValue - The string to projects by.
   */
  public applyFilter(filterValue: string): void {
    this.tableData.filter = filterValue.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  /**
   * Generate a label for each checkbox in the table.
   *
   * @param row - A project in the table.
   *
   * @returns {string} - The checkbox label.
   */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    } else {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title}`;
    }
  }

  /**
   * Delete selected projects from the database.
   */
  public deleteProjects(): void {
    const confirmDialogRef = this.dialog.open(ConfirmDeleteComponent);

    confirmDialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
          height: '150px',
          width: '150px'
        });

        const urls: string[] = _.map(this.selectedProjects, 'url');
        const projects: Projects = _.pick(this.projects, urls);
        try {
          this.storageService.deleteProjects(projects);
          await this.projectsService.deleteProjects(urls);
          this.selection.clear();
        } catch (error) {
          throw new Error(error);
        } finally {
          dialogRef.close();
        }
      }
    });
  }

  /**
   * Check if all projects are selected in the table.
   *
   * @returns {boolean} - True is all projects are selected.
   */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    let numRows: number;
    if (this.tableData && this.tableData.data) {
      numRows = this.tableData.data.length;
    } else {
      numRows = -1;
    }
    return numSelected === numRows;
  }

  /**
   * Toggle the master checkbox which selects / deselects all projects in the table.
   */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      _.each (this.tableData.data, (tableRow) => {
        this.selection.select(tableRow);
      });
  }

  /**
   * Open a project.
   *
   * @param {string} url - The url of the project to open.
   */
  public openProject(url: string): void {
    this.router.navigate([`../project/${url}`], {relativeTo: this.activatedRoute});
  }

}

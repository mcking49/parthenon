import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projects } from 'src/app/interfaces/projects';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { Project } from 'src/app/interfaces/project';
import { SelectionModel } from '@angular/cdk/collections';
import { LoadingSpinnerModalComponent } from 'src/app/components/loading-spinner-modal/loading-spinner-modal.component';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private projectsService: ProjectsService
  ) {
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit() {
    this.projectsService.projects$.subscribe((projects) => {
      if (projects) {
        const projectsArray = _.map(projects, (project: Project) => {
          return _.pick(project, ['year', 'title', 'category', 'url']);
        });
        this.tableData = new MatTableDataSource(projectsArray);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
      }
    });
  }

  public get selectedProjects(): any[] {
    return this.selection.selected;
  }

  public applyFilter(filterValue: string) {
    this.tableData.filter = filterValue.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    } else {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title}`;
    }
  }

  public async deleteProjects() {
    // TODO: Add confirmation popup
    const dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
      maxHeight: '150px',
      height: '150px',
      width: '150px'
    });

    const urls: string[] = _.map(this.selectedProjects, 'url');
    try {
      await this.projectsService.deleteProjects(urls);
      this.selection.clear();
    } catch (error) {
      throw new Error(error);
    } finally {
      dialogRef.close();
    }
  }

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

  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      _.each (this.tableData.data, (tableRow) => {
        this.selection.select(tableRow);
      });
  }

  public openProject(url: string): void {
    this.router.navigate([`../project/${url}`], {relativeTo: this.activatedRoute});
  }

}

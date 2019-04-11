import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.isHandset$ = this.responsiveService.isHandset;
  }

}

import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isHandset: Observable<boolean>;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.isHandset = this.responsiveService.isHandset;
  }

}

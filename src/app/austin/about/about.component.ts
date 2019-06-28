import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { About } from 'src/app/interfaces/about';
import { AboutService } from './../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnDestroy, OnInit {

  public about: About;

  private aboutSubscription: Subscription;

  constructor(private aboutService: AboutService) { }

  ngOnDestroy() {
    if (this.aboutSubscription) {
      this.aboutSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.aboutSubscription = this.aboutService.about$.subscribe((about: About) => {
      this.about = about;
    });
  }

  /**
   * Check if the about content is still loading.
   *
   * @returns {boolean} - Returns true if the about content hasn't been loaded yet.
   */
  public get isLoading(): boolean {
    return !this.about;
  }

}

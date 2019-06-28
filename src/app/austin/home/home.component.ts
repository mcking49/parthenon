import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Profile } from './../../interfaces/profile';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy, OnInit {

  public profile: Profile;

  private profileSubscription: Subscription;

  constructor(private profileService: ProfileService) { }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.profileSubscription = this.profileService.profile$.subscribe((profile: Profile) => {
      this.profile = profile;
    });
  }

  /**
   * Check if the profile content is still loading.
   *
   * @returns {boolean} - Returns true if the profile content hasn't been loaded yet.
   */
  public get isLoading(): boolean {
    return !this.profile;
  }

}

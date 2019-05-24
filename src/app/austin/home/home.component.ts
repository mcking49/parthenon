import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public profile: Profile;

  constructor(
    private authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.authService.anonymousLogin().then(() => {
      this.profileService.profile$.subscribe((profile: Profile) => {
        if (profile) {
          this.profile = profile;
          this.changeDetector.detectChanges();
        }
      });
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

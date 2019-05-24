import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { About } from 'src/app/interfaces/about';
import { AboutService } from 'src/app/services/about.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public about: About;

  constructor(
    private aboutService: AboutService,
    private authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.anonymousLogin().then(() => {
      this.aboutService.about$.subscribe((about: About) => {
        if (about) {
          this.about = about;
          this.changeDetector.detectChanges();
        }
      });
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

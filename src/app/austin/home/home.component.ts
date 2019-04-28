import { Component, OnInit } from '@angular/core';
import { Profile } from './../../interfaces/profile';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public profile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profile$.subscribe((profile: Profile) => {
      this.profile = profile;
    });
  }

}

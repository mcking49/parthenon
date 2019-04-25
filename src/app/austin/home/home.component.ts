import { Component, OnInit } from '@angular/core';
import { Profile } from './../../interfaces/profile';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name: string;
  public jobTitle: string;
  public profileImgUrl: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe((profile: Profile) => {
      this.name = `${profile.firstName} ${profile.lastName}`;
      this.jobTitle = profile.jobTitle;
      this.profileImgUrl = profile.profileImgUrl;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Profile } from './../../interfaces/profile';
import { ProfileService } from './../../services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public profile$: Observable<Profile>;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profile$ = this.profileService.getProfile();
  }

}

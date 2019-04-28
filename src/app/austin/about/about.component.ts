import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/interfaces/about';
import { AboutService } from './../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public about: About;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.aboutService.about$.subscribe((about: About) => {
      this.about = about;
    })
  }

}

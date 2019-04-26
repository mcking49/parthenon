import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from 'src/app/interfaces/about';
import { AboutService } from './../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public about$: Observable<About>;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.about$ = this.aboutService.getAbout();
  }

}

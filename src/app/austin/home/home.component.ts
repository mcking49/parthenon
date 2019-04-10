import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public readonly title = `Austin D'Souza`;
  public readonly subtitle = 'Graduate Architect';

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = `Austin D'Souza`;
  subtitle = 'Graduate Architect';

  constructor() { }

  ngOnInit() {
  }

}

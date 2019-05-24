import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-austin',
  templateUrl: './austin.component.html',
  styleUrls: ['./austin.component.scss']
})
export class AustinComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.anonymousLogin();
  }

}

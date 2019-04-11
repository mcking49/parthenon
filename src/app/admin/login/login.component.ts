import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // TODO: after implementing the authentication service, add an if statement
    // here to only navigate to the dashboard screen if the user is authenticated.
    // Below is an example of what that might look like.
    // if (this.authService.isLoggedIn) {
    //   this.router.navigate(['../dashboard'], {relativeTo: this.activatedRoute});
    // }
  }

}

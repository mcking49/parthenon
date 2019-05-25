import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackingService } from './services/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  constructor(private trackingService: TrackingService) { }

  ngOnDestroy() {
    this.trackingService.stop();
  }

  ngOnInit() {
    this.trackingService.start();
  }
}

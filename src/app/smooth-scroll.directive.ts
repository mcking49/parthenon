import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appSmoothScroll]'
})
export class SmoothScrollDirective implements AfterViewInit {

  constructor(private el: ElementRef, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment: string) => {
      if (fragment && this.el.nativeElement && this.el.nativeElement.id === fragment) {
        this.el.nativeElement.scrollIntoView({behaviour: 'smooth'});
      }
    });
  }

}

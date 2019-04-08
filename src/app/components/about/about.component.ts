import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public bio: string[];
  public isHandset: Observable<boolean>;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.initBio();
    this.isHandset = this.responsiveService.isHandset;
  }

  public initBio(): void {
    this.bio = [
      "I’m Austin, a recent Master of Architecture Graduate from Victoria University of Wellington, New Zealand.",
      `I am passionate about architecture and I find myself interested in social architecture; discovering new ways to bring people together in a space. But there is a lot more to me than just my love for designing. I was born and raised in India up to the age of 8, before moving to the “land of the long white cloud” – Aotearoa | New Zealand.`,
      "I have been described as an outgoing individual, that loves being around people and engaging in activities. However, I also find merit in time out for myself. My peers also describe me as friendly and caring, and always willing to help out. I love challenges, and usually like to tackle them head on. I enjoy working in groups as I feel that there is a lot to learn from the people that surround me and I love the results that can be achieved when collaborating, but I am just as confident working independently when needed.",
      "A lot of my educators and employers say that I am responsible and hard working. I enjoy taking responsibility and delivering on my promises. One of the things that I value the most in life is other people. I love to engage with others, whether it’s to share laughs and knowledge or just lend a helping hand. I treasure the interactions I have with people and the connections that I have made.",
      "Among many of my educational responsibilities, I am a part of many extra-curricular activities and have been blessed with various awards and scholarships along the way. Following are a few of my selected architecture works.",
      "Please feel free to contact me anytime for any feedback or to learn more about me or my projects."
    ];
  }

}

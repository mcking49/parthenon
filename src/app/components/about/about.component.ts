import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public bio: string[];

  constructor() { }

  ngOnInit() {
    this.initBio();
  }

  public initBio(): void {
    this.bio = [
      "I’m Austin, a recent Architectural Graduate from Victoria University of Wellington, New Zealand.",
      "I am passionate about architecture, as you will see in the following pages, but there is a lot more to me than just my love for designing. I come from India, where I was born and raised up to the age of 8, before moving to the “land of the long white cloud” – Aotearoa. Ever since, I have considered New Zealand to be my home, and have made the most of the opportunities that it has offered me, thus far.",
      "I like to think of myself as an outgoing individual, that loves being around people or engaging in activities, but also finds merit in time out to myself and relaxing. My peers would describe me as friendly and caring, and always willing to help out. I love challenges, and usually like to tackle them head on. I enjoy working in groups as I feel that there is a lot to learn from the people that surround you, but i’m just as confident working by myself when needed. When it comes to workloads, I am well organized and like to plan ahead to make sure that I stay on track. I enjoy the work that I do, but also take it seriously when need be, and work tirelessly to ensure that I don’t disappoint the ones that rely on me.",
      "A lot of my educators and friends say that I am a leader - I love to get involved with things. I enjoy taking responsibility and delivering on my promises. One of the things that I value the most in my career and also in general life, is other people. I love to engage with others, whether it’s to share laughs and knowledge or just lend a helping hand, I love the interaction that can be had and results that can be achieved when working together.",
      "Staying active is important for me. I play football and basketball for sports clubs, but also enjoy hitting a tennis ball or going to the gym for a workout when time permits. I like watching sports too, and can usually be found supporting my favourite teams at full lengths when they are in play. I like to listen to music, no matter what the genre is. I can go from soothing jazz while doing work, to motivational dance when at the gym. Family is something that is extremely important to me, and I try my best to take time off the busy architecture grind to spend time with them when possible.",
      "An interesting fact? I love to travel - a lot. Whether its short road trips up the Kapiti coast, or on a plane to a different continent. I have been lucky enough to travel to more than 25 countries and 90 cities thus far. In this time I have gained knowledge and memories that I will carry with me forever, as well as having the opportunity to soak in different cultures and other perspectives of life. I like to share my experiences with others, and encourage them to also go and see the world, offering tips and tricks so that others too can have the privilege of seeing what this wonderful planet has to offer.",
      "So, that’s me very briefly. Following is a few of my selected architecture works - enjoy!"
    ];
  }

}

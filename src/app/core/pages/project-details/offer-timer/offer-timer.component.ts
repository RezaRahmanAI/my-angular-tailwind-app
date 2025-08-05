import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-offer-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offer-timer.component.html',
  styleUrls: ['./offer-timer.component.css'],
})
export class OfferTimerComponent implements AfterViewInit {
  @Input() timer: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  } = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };
  @Input() offerActive: boolean = false;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.from('.offer_time_bar', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.offer_time_bar',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }
}

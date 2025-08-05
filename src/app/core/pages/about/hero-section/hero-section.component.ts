import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements AfterViewInit {
  ngAfterViewInit() {
    gsap.from('.headering', {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: 'power2.out',
    });
    gsap.from('.page_title', {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.3,
    });
  }
}

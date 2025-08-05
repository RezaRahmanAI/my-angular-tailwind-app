import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [],
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Section fade-in
    gsap.from('.bottom-bar', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Staggered entrance for content
    gsap.from('.bottom-bar-content > *', {
      opacity: 0,
      y: 10,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2,
    });

    // Hover animations for links
    gsap.utils.toArray('.bottom-bar a').forEach((link: any) => {
      gsap.to(link, {
        y: -2,
        color: '#14B8A6',
        duration: 0.3,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(link, { y: -2, color: '#14B8A6', duration: 0.3 }),
          mouseleave: () => gsap.to(link, { y: 0, color: '#D1D5DB', duration: 0.3 }),
        },
      });
    });
  }
}

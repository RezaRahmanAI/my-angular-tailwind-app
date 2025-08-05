import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-brand-info',
  standalone: true,
  imports: [],
  templateUrl: './brand-info.component.html',
  styleUrls: ['./brand-info.component.css'],
})
export class BrandInfoComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Section fade-in
    gsap.from('.brand-info', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Staggered entrance for logo and text
    gsap.from('.brand-info > div', {
      opacity: 0,
      y: 10,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.2,
    });

    // Staggered entrance for trust badges
    gsap.from('.trust-badge', {
      opacity: 0,
      x: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.4,
    });

    // Hover animations for newsletter button
    gsap.to('.newsletter-button', {
      scale: 1.05,
      duration: 0.3,
      ease: 'power1.out',
      paused: true,
      on: {
        mouseenter: () => gsap.to('.newsletter-button', { scale: 1.05, duration: 0.3 }),
        mouseleave: () => gsap.to('.newsletter-button', { scale: 1, duration: 0.3 }),
      },
    });

    // Animation for newsletter input on focus
    gsap.to('.newsletter-input', {
      scale: 1.02,
      duration: 0.3,
      ease: 'power1.out',
      paused: true,
      on: {
        focus: () => gsap.to('.newsletter-input', { scale: 1.02, duration: 0.3 }),
        blur: () => gsap.to('.newsletter-input', { scale: 1, duration: 0.3 }),
      },
    });
  }
}

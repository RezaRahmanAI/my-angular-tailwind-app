import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact-social',
  standalone: true,
  imports: [],
  templateUrl: './contact-social.component.html',
  styleUrls: ['./contact-social.component.css'],
})
export class ContactSocialComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Section fade-in
    gsap.from('.contact-social', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Staggered entrance for headers
    gsap.from('.animate-gsap', {
      opacity: 0,
      y: 10,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.2,
    });

    // Staggered entrance for contact items and social links
    gsap.from('.contact-item, .social-links a', {
      opacity: 0,
      x: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.4,
    });

    // Hover animations for links
    gsap.utils.toArray('.animate-gsap-link').forEach((item: any) => {
      gsap.to(item, {
        y: -2,
        color: '#14B8A6',
        duration: 0.3,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(item, { y: -2, color: '#14B8A6', duration: 0.3 }),
          mouseleave: () => gsap.to(item, { y: 0, color: '#D1D5DB', duration: 0.3 }),
        },
      });
    });

    // Hover animations for icons
    gsap.utils.toArray('.animate-gsap-icon').forEach((icon: any) => {
      gsap.to(icon, {
        scale: 1.2,
        duration: 0.3,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(icon, { scale: 1.2, duration: 0.3 }),
          mouseleave: () => gsap.to(icon, { scale: 1, duration: 0.3 }),
        },
      });
    });
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.css'],
})
export class QuickLinksComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Section fade-in
    gsap.from('.quick-links', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Staggered entrance for link groups
    gsap.from('.link-group', {
      opacity: 0,
      y: 10,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.2,
    });

    // Staggered entrance for links
    gsap.from('.link-group a', {
      opacity: 0,
      x: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.4,
    });

    // Hover animations for links
    gsap.utils.toArray('.link-group a').forEach((link: any) => {
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

    // Hover animations for icons
    gsap.utils.toArray('.link-group i').forEach((icon: any) => {
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

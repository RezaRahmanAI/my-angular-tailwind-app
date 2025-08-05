import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-project-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css'],
})
export class ProjectHeaderComponent implements AfterViewInit {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.from('.headering', {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.headering',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.page_title h1', {
      y: 20,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.4,
      scrollTrigger: {
        trigger: '.headering',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }
}

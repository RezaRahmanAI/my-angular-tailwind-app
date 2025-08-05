import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
})
export class TabBarComponent implements AfterViewInit {
  activeTab: string | null = null;

  constructor(private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.from('.tab_bar', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.tab_bar',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Set up scroll-based active tab highlighting
    this.setupScrollSpy();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeTab = sectionId;
    }
  }

  setupScrollSpy(): void {
    const sections = [
      'atGlance',
      'featureAndAmenities',
      'projectGallery',
      'locationMap',
      'relatedProjects',
      'contacting',
    ];
    sections.forEach((sectionId) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => (this.activeTab = sectionId),
        onEnterBack: () => (this.activeTab = sectionId),
      });
    });
  }
}

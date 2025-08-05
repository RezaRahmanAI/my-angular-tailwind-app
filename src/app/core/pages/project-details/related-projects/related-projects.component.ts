import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-related-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './related-projects.component.html',
  styleUrls: ['./related-projects.component.css'],
})
export class RelatedProjectsComponent implements AfterViewInit {
  @Input() projects: any[] = [];
  @Input() baseUrl: string = '';
  @Output() imageError = new EventEmitter<Event>();

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.from('.related_projects', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.related_projects',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.utils.toArray('.project_card').forEach((card: any, index: number) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power2.out',
        delay: index * 0.4,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  onImageError(event: Event): void {
    this.imageError.emit(event);
  }
}

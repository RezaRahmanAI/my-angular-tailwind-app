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
  selector: 'app-feature-amenities',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-amenities.component.html',
  styleUrls: ['./feature-amenities.component.css'],
})
export class FeatureAmenitiesComponent implements AfterViewInit {
  @Input() features: any[] = [];
  @Input() baseUrl: string = '';
  @Output() imageError = new EventEmitter<Event>();

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.from('.feature_and_amenities', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.feature_and_amenities',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.utils.toArray('.featureCard').forEach((card: any, index: number) => {
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

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
  selector: 'app-at-glance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './at-glance.component.html',
  styleUrls: ['./at-glance.component.css'],
})
export class AtGlanceComponent implements AfterViewInit {
  @Input() project: any = null;
  @Input() baseUrl: string = '';
  @Output() imageError = new EventEmitter<Event>();

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.from('.project_details_section', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.project_details_section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  onImageError(event: Event): void {
    this.imageError.emit(event);
  }
}

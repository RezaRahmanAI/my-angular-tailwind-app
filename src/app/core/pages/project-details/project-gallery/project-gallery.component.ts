import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fancybox } from '@fancyapps/ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.css'],
})
export class ProjectGalleryComponent implements AfterViewInit, OnDestroy {
  @Input() gallery: any[] = [];
  @Input() baseUrl: string = '';
  @Output() imageError = new EventEmitter<Event>();

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    Fancybox.bind('[data-fancybox]', {});
    gsap.from('.project_gallary', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.project_gallary',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  ngOnDestroy(): void {
    Fancybox.destroy();
  }

  onImageError(event: Event): void {
    this.imageError.emit(event);
  }
}

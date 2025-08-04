import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  image?: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialCarouselComponent {
  @Input() testimonials: Testimonial[] = [];
  currentIndex = 0;

  prev() {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.testimonials.length - 1;
  }

  next() {
    this.currentIndex =
      this.currentIndex < this.testimonials.length - 1
        ? this.currentIndex + 1
        : 0;
  }
}

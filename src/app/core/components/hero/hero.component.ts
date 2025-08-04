import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  //

  slides: Slide[] = [
    {
      image:
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Luxury Homes Await You',
      subtitle: 'Find quality living with trust and vision.',
    },
    {
      image:
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Modern Living Spaces',
      subtitle: 'Explore contemporary designs and comfort.',
    },
    {
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Premium Real Estate Solutions',
      subtitle: 'Your gateway to exceptional properties.',
    },
    {
      image:
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Your Dream Property Awaits',
      subtitle: 'Connecting you with your ideal home.',
    },
  ];

  currentSlideIndex = 0;
  private slideInterval: ReturnType<typeof setInterval> | null = null;
  private isPaused = false;

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    this.clear();
  }

  startSlideshow() {
    this.clear();
    this.slideInterval = setInterval(() => {
      if (!this.isPaused) this.nextSlide();
    }, 4000);
  }

  clear() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    if (index === this.currentSlideIndex) return;
    this.currentSlideIndex = index;
  }
}

// slides: Slide[] = [
//   {
//     image:
//       'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
//     title: 'Luxury Homes Await You',
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
//     title: 'Modern Living Spaces',
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
//     title: 'Premium Real Estate Solutions',
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
//     title: 'Your Dream Property Awaits',
//   },
// ];

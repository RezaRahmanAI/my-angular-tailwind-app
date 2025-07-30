import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  title: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      image:
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Luxury Homes Await You',
    },
    {
      image:
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Modern Living Spaces',
    },
    {
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Premium Real Estate Solutions',
    },
    {
      image:
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Your Dream Property Awaits',
    },
  ];

  currentSlideIndex = 0;
  private slideInterval: any;

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide() {
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
      currentSlideElement.classList.add('prev');
      setTimeout(() => {
        currentSlideElement.classList.remove('prev');
      }, 1000);
    }

    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    if (index === this.currentSlideIndex) return;

    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
      currentSlideElement.classList.add('prev');
      setTimeout(() => {
        currentSlideElement.classList.remove('prev');
      }, 1000);
    }

    this.currentSlideIndex = index;
  }
}

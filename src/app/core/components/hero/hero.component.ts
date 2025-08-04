import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeroSectionService } from '../../services/hero-section.service';
import { Slide } from '../../models/model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers: [HeroSectionService],
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  currentSlideIndex = 0;
  timeRunning = 3000;
  timeAutoNext = 7000;
  runTimeOut: any;
  runNextAuto: any;

  constructor(private heroSectionService: HeroSectionService) {}

  ngOnInit(): void {
    this.heroSectionService.getSlides().subscribe((slides) => {
      this.slides = slides;
      this.startAutoSlide();
    });
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  showSlider(type: 'next' | 'prev'): void {
    this.clearTimers();

    if (type === 'next') {
      this.currentSlideIndex =
        (this.currentSlideIndex + 1) % this.slides.length;
    } else {
      this.currentSlideIndex =
        (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    }

    this.runTimeOut = setTimeout(() => {
      document.querySelector('.carousel')?.classList.remove('next', 'prev');
    }, this.timeRunning);

    document.querySelector('.carousel')?.classList.add(type);
    this.startAutoSlide();
  }

  goToSlide(index: number): void {
    this.clearTimers();
    this.currentSlideIndex = index;
    document.querySelector('.carousel')?.classList.add('next');
    this.runTimeOut = setTimeout(() => {
      document.querySelector('.carousel')?.classList.remove('next', 'prev');
    }, this.timeRunning);
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.runNextAuto = setTimeout(() => {
      this.showSlider('next');
    }, this.timeAutoNext);
  }

  private clearTimers(): void {
    if (this.runTimeOut) {
      clearTimeout(this.runTimeOut);
    }
    if (this.runNextAuto) {
      clearTimeout(this.runNextAuto);
    }
  }
}

import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements AfterViewInit {
  @Input() history?: string;

  ngAfterViewInit() {
    gsap.from('.history h2', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
    });
    gsap.from('.history .prose', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.4,
    });
  }
}

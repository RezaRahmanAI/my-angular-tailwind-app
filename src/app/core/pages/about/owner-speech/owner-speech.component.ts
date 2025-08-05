import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-owner-speech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-speech.component.html',
  styleUrls: ['./owner-speech.component.css'],
})
export class OwnerSpeechComponent implements AfterViewInit {
  @Input() ownerName?: string;
  @Input() ownerDesignation?: string;
  @Input() ownerSpeech?: string;
  @Input() ownerImage?: string;
  @Output() imageError = new EventEmitter<Event>();

  ngAfterViewInit() {
    gsap.from('.owner_speech img', {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power2.out',
    });
    gsap.from('.owner_speech h2', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.3,
    });
    gsap.from('.owner_speech h3, .owner_speech p', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.2,
      delay: 0.5,
    });
  }

  onImageError(event: Event) {
    this.imageError.emit(event);
  }
}

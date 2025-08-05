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
  selector: 'app-mission-vision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-vision.component.html',
  styleUrls: ['./mission-vision.component.css'],
})
export class MissionVisionComponent implements AfterViewInit {
  @Input() mission?: string;
  @Input() missionImage?: string;
  @Input() vision?: string;
  @Input() visionImage?: string;
  @Output() imageError = new EventEmitter<Event>();

  ngAfterViewInit() {
    gsap.from('.our_vision_mission .mission img', {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power2.out',
    });
    gsap.from(
      '.our_vision_mission .mission h2, .our_vision_mission .mission p',
      {
        opacity: 0,
        y: 20,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3,
      }
    );
    gsap.from('.our_vision_mission .vision img', {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.5,
    });
    gsap.from('.our_vision_mission .vision h2, .our_vision_mission .vision p', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.7,
    });
  }

  onImageError(event: Event) {
    this.imageError.emit(event);
  }
}

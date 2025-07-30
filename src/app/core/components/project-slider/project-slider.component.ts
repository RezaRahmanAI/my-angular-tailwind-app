import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-slider.component.html',
  styleUrls: ['./project-slider.component.css'],
})
export class ProjectSliderComponent {
  baseUrl = 'https://yourapi.com';

  list = [
    { id: 1, name: 'Waheed Height', type: 'Residential', address: 'Doshor Mandal More', thumbnail: 'project1.jpg' },
    { id: 2, name: 'Dhrubotara', type: 'Residential', address: 'Rajshahi', thumbnail: 'project2.jpg' },
    { id: 3, name: 'Baitus Sharif', type: 'Residential', address: 'Siroil, Sagar Para Road', thumbnail: 'project3.jpg' },
    { id: 4, name: 'Project Four', type: 'Commercial', address: 'Dhaka', thumbnail: 'project4.jpg' },
    { id: 5, name: 'Project Five', type: 'Industrial', address: 'Chattogram', thumbnail: 'project5.jpg' },
  ];

  currentIndex = 0;

  visibleProjects() {
    // Show 3 projects starting from currentIndex with wrap-around (loop)
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (this.currentIndex + i) % this.list.length;
      result.push(this.list[index]);
    }
    return result;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.list.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.list.length) % this.list.length;
  }
}

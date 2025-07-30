import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './our-projects.component.html',
  styleUrls: ['./our-projects.component.css'],
})
export class OurProjectsComponent {
  baseUrl = 'https://yourapi.com'; // replace with your real API base URL

  list = [
    {
      id: '1',
      name: 'Project One',
      category: 'Residential',
      type: 'Apartment',
      thumbnail: 'project1.jpg',
    },
    {
      id: '2',
      name: 'Project Two',
      category: 'Commercial',
      type: 'Office',
      thumbnail: 'project2.jpg',
    },
    {
      id: '3',
      name: 'Project Three',
      category: 'Mixed Use',
      type: 'Mall',
      thumbnail: 'project3.jpg',
    },
  ];
}

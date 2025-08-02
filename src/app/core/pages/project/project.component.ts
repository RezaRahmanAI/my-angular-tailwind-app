import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ProjectItem {
  id: number | string;
  name: string;
  category: string;
  type: string;
  thumbnail: string;
  location: string;
  canSchedule?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent implements OnInit {
  @ViewChild('categorySelect') categorySelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('typeSelect') typeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('locationSelect') locationSelect!: ElementRef<HTMLSelectElement>;

  baseUrl = 'https://dummy.com';

  originalList: ProjectItem[] = [
    {
      id: 1,
      name: 'Project One',
      category: 'Ongoing',
      type: 'Residential',
      thumbnail: 'dummy-project-1.jpg',
      location: 'Dhaka',
      canSchedule: true,
    },
    {
      id: 2,
      name: 'Project Two',
      category: 'Completed',
      type: 'Commercial',
      thumbnail: 'dummy-project-2.jpg',
      location: 'Chattagram',
      canSchedule: false,
    },
    {
      id: 3,
      name: 'Project Three',
      category: 'Upcoming',
      type: 'Residential',
      thumbnail: 'dummy-project-3.jpg',
      location: 'Rajshahi',
      canSchedule: true,
    },
  ];

  state = {
    list: [] as ProjectItem[],
  };

  ngOnInit(): void {
    // initial full list
    this.state.list = [...this.originalList];
  }

  getProject(): void {
    const category = this.categorySelect.nativeElement.value;
    const type = this.typeSelect.nativeElement.value;
    const location = this.locationSelect.nativeElement.value;

    let filteredList = [...this.originalList];
    if (category && category !== 'all') {
      filteredList = filteredList.filter((item) => item.category === category);
    }
    if (type && type !== 'all') {
      filteredList = filteredList.filter((item) => item.type === type);
    }
    if (location && location !== 'all') {
      filteredList = filteredList.filter((item) => item.location === location);
    }
    this.state.list = filteredList;
  }

  resetFilters(): void {
    if (this.categorySelect) this.categorySelect.nativeElement.value = 'all';
    if (this.typeSelect) this.typeSelect.nativeElement.value = 'all';
    if (this.locationSelect) this.locationSelect.nativeElement.value = 'all';
    this.state.list = [...this.originalList];
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/images/fallback.png';
  }
}

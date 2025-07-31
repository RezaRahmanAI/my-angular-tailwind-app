import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http'; // Commented out
// import { environment } from '../../environments/environment'; // Commented out

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

  // baseUrl = environment.apiBaseUrl; // Commented out
  baseUrl = 'https://dummy.com'; // Dummy base URL for image paths

  state = {
    list: [
      {
        id: 1,
        name: 'Project One',
        category: 'Ongoing',
        type: 'Residential',
        thumbnail: 'dummy-project-1.jpg',
        location: 'Dhaka',
      },
      {
        id: 2,
        name: 'Project Two',
        category: 'Completed',
        type: 'Commercial',
        thumbnail: 'dummy-project-2.jpg',
        location: 'Chattagram',
      },
      {
        id: 3,
        name: 'Project Three',
        category: 'Upcoming',
        type: 'Residential',
        thumbnail: 'dummy-project-3.jpg',
        location: 'Rajshahi',
      },
    ],
  };

  ngOnInit(): void {
    // Commenting out API calls
    // this.getProject();
  }

  // constructor(private http: HttpClient) {} // Commented out
  constructor() {}

  // Commenting out API call methods
  /*
  getProject(): void {
    const category = (document.getElementById('category') as HTMLSelectElement).value;
    const type = (document.getElementById('type') as HTMLSelectElement).value;
    const location = (document.getElementById('location') as HTMLSelectElement).value;
    this.http.get<any>(`${this.baseUrl}/api/website/getprojects?category=${category}&type=${type}&location=${location}`, { method: 'GET' }).subscribe({
      next: (data) => {
        this.state.list = data;
        console.log(this.state.list);
      },
      error: (err) => console.error('Error fetching projects:', err),
    });
  }
  */

  getProject(): void {
    const category = this.categorySelect.nativeElement.value;
    const type = this.typeSelect.nativeElement.value;
    const location = this.locationSelect.nativeElement.value;

    // Simulate filtering with dummy data (no API call)
    let filteredList = [...this.state.list];
    if (category !== 'all')
      filteredList = filteredList.filter((item) => item.category === category);
    if (type !== 'all')
      filteredList = filteredList.filter((item) => item.type === type);
    if (location !== 'all')
      filteredList = filteredList.filter((item) => item.location === location);
    this.state.list = filteredList;
  }
}

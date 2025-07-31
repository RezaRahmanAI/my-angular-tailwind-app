import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http'; // Commented out
// import { environment } from '../../environments/environment'; // Commented out
// import { toast } from 'vue3-toastify'; // Commented out
// import 'vue3-toastify/dist/index.css'; // Commented out

@Component({
  selector: 'app-landowner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './landowner.component.html',
  styleUrls: ['./landowner.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandownerComponent implements OnInit {
  @ViewChild('landownerForm') landownerForm!: ElementRef<HTMLFormElement>;

  // baseUrl = environment.apiBaseUrl; // Commented out
  baseUrl = 'https://dummy.com'; // Dummy base URL for image paths

  state = {
    testis: [
      {
        image: 'dummy-employee-1.jpg',
        name: 'Harsh P.',
        description:
          "As a busy professional, I don't have a lot of time to manage my investments, but this has made it possible for me to stay on top of my portfolio.",
      },
      {
        image: 'dummy-employee-2.jpg',
        name: 'Sarah K.',
        description:
          "This has revolutionized how I handle my investments. It's easy to use and provides real-time insights.",
      },
      {
        image: 'dummy-employee-3.jpg',
        name: 'John D.',
        description:
          'I love how this keeps everything organized. I can track my investments effortlessly.',
      },
      {
        image: 'dummy-employee-1.jpg',
        name: 'Lisa M.',
        description:
          "With this, I no longer feel lost in managing my portfolio. It's the best tool I've used.",
      },
    ],
  };

  currentIndex = 0;

  landownerData = {
    name: '',
    email: '',
    phone: '',
    locality: '',
    landCategory: '',
    frontRoadWidth: '',
    facing: '',
    address: '',
    message: '',
  };

  ngOnInit(): void {
    // No initialization needed for now
  }

  // constructor(private http: HttpClient) {} // Commented out
  constructor() {}

  prevTestimonial(): void {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.state.testis.length - 1;
  }

  nextTestimonial(): void {
    this.currentIndex =
      this.currentIndex < this.state.testis.length - 1
        ? this.currentIndex + 1
        : 0;
  }

  // Commenting out API and toast methods
  /*
  gettestimonials(): void {
    this.http.get<any>(`${this.baseUrl}/api/website/gettestimonials`, { method: 'GET' }).subscribe({
      next: (data) => {
        this.state.testis = data;
      },
      error: (err) => console.error('Error fetching testimonials:', err),
    });
  }

  createData(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const locality = (document.getElementById('locality') as HTMLInputElement).value;
    const landCategory = (document.getElementById('landCategory') as HTMLSelectElement).value;
    const frontRoadWidth = (document.getElementById('frontRoadWidth') as HTMLInputElement).value;
    const facing = (document.getElementById('facing') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    const obj2 = { name, email, phone, locality, landCategory, frontRoadWidth, facing, address, message };
    this.http.post(`${this.baseUrl}/api/website/createlandowner`, obj2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).subscribe({
      next: (data) => this.showToatSuccess(data),
      error: (err) => console.error('Error submitting landowner data:', err),
    });
  }

  showToatSuccess(message: string): void {
    toast.success(message, {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
  */

  createData(): void {
    console.log('Form submitted with data:', this.landownerData);
    alert('Landowner form submitted successfully! (Dummy response)');
    this.landownerData = {
      name: '',
      email: '',
      phone: '',
      locality: '',
      landCategory: '',
      frontRoadWidth: '',
      facing: '',
      address: '',
      message: '',
    }; // Reset form
  }
}

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
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLFormElement>;

  // baseUrl = environment.apiBaseUrl; // Commented out
  baseUrl = 'https://dummy.com'; // Dummy base URL for image paths

  contactData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  ngOnInit(): void {
    // No initialization needed for now
  }

  // constructor(private http: HttpClient) {} // Commented out
  constructor() {}

  // Commenting out API and toast methods
  /*
  createData(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLSelectElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    const obj2 = { name, email, phone, subject, message };
    this.http.post(`${this.baseUrl}/api/website/createcontactus`, obj2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).subscribe({
      next: (data) => this.showToatSuccess(data),
      error: (err) => console.error('Error submitting contact:', err),
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
    console.log('Form submitted with data:', this.contactData);
    alert('Contact form submitted successfully! (Dummy response)');
    this.contactData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }; // Reset form
  }
}

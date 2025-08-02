import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';


interface ContactData {
  subject: string;
  propertyType?: string;
  budget?: number;
  timeline?: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  visitDate?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactComponent implements OnInit {
  contactData: ContactData = {
    subject: '',
    propertyType: '',
    budget: undefined,
    timeline: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    visitDate: '',
  };

  submitting = false;
  submitted = false;
  errorMessage = '';

  ngOnInit(): void {}

  isMapLoaded = false;

  onMapLoad(): void {
    this.isMapLoaded = true;
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private validatePhone(phone: string): boolean {
    return /^[0-9+\-()\s]{7,20}$/.test(phone);
  }

  createData(form: NgForm): void {
    if (this.submitting) return;
    this.errorMessage = '';
    if (form.invalid) {
      this.errorMessage = 'Please complete required fields.';
      return;
    }
    if (!this.validateEmail(this.contactData.email)) {
      this.errorMessage = 'Invalid email address.';
      return;
    }
    if (!this.validatePhone(this.contactData.phone)) {
      this.errorMessage = 'Invalid phone number.';
      return;
    }
    if (!this.contactData.subject) {
      this.errorMessage = 'Please select purpose of contact.';
      return;
    }

    this.submitting = true;

    // Simulate API / replace with real POST
    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      console.log('Lead captured:', this.contactData);
      form.resetForm();
      this.contactData = {
        subject: '',
        propertyType: '',
        budget: undefined,
        timeline: '',
        name: '',
        phone: '',
        email: '',
        message: '',
        visitDate: '',
      };
    }, 1000);
  }
}

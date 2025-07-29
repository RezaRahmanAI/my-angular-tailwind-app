import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../../services/contact.service';
import { ContactDto } from '../../../../models/ContactDto';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css'],
})
export class AdminContactComponent implements OnInit {
  messages: ContactDto[] = [];
  loading = true;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}

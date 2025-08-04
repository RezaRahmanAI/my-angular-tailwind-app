import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DataService } from '../../services/data-service.service';
import { Offer } from '../../models/model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [DataService],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [animate('300ms ease-in-out')]),
      transition(':leave', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  isModalVisible = false;
  offer: Offer | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getOffer().subscribe((offer) => {
      this.offer = offer;
    });
  }

  onToggle(): void {
    this.isModalVisible = !this.isModalVisible;
  }
}

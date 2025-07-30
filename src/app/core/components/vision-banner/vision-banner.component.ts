import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vision-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vision-banner.component.html',
  styleUrls: ['./vision-banner.component.css'],
})
export class VisionBannerComponent {}

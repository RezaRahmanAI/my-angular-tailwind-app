import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-explore',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-explore.component.html',
  styleUrls: ['./project-explore.component.css'], // or .scss if you prefer
})
export class ProjectExploreComponent {}

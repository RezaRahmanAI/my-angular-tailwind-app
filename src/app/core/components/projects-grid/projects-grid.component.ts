import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ProjectItem {
  id: number;
  name: string;
  category: string;
  type: string;
  thumbnail: string;
}

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.css'],
})
export class ProjectsGridComponent {
  @Input() projects: ProjectItem[] = [];
}

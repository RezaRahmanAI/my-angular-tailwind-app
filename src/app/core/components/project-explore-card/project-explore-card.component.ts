import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-explore-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-explore-card.component.html',
  styleUrls: ['./project-explore-card.component.css'],
})
export class ProjectExploreCardComponent {
  @Input() title = '';
  @Input() image = '';
  @Input() route = '';
}

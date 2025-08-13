import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects-features',
  standalone: true,
  templateUrl: './projects-features.component.html',
  styleUrls: ['./projects-features.component.css'],
})
export class ProjectsFeaturesComponent {
  projectId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }
}

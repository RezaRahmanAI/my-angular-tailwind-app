import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects-gallery',
  standalone: true,
  templateUrl: './projects-gallery.component.html',
  styleUrls: ['./projects-gallery.component.css'],
})
export class ProjectsGalleryComponent {
  projectId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }
}

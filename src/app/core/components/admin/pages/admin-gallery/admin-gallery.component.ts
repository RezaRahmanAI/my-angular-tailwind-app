import { Component, OnInit } from '@angular/core';
import { GalleryItem } from '../../../../models/gallery.model';
import { GalleryService } from '../../../../services/gallery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-gallery.component.html',
})
export class AdminGalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];
  selectedFile: File | null = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.loadGallery();
  }

  loadGallery() {
    this.galleryService.getGallery().subscribe({
      next: (items) => (this.galleryItems = items),
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.galleryService.uploadGalleryItem(formData).subscribe({
      next: () => {
        this.selectedFile = null;
        this.loadGallery();
      },
      error: (err) => console.error(err),
    });
  }

  deleteItem(id: number) {
    this.galleryService.deleteGalleryItem(id).subscribe({
      next: () => this.loadGallery(),
      error: (err) => console.error(err),
    });
  }
}

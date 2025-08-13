import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css'],
})
export class ProjectsFormComponent {
  @Input() set project(value: Project | null) {
    this._project = value ? { ...value } : { ...this.defaultProject };
    this.contentType = this._project.contentType || '';
  }
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  contentType: string = '';
  selectedThumbnail: File | null = null;
  selectedContent: File | null = null;

  private defaultProject: Project = {
    id: '',
    name: '',
    description: '',
    address: '',
    thumbnail: '',
    category: '',
    type: '',
    contentType: '',
    content: '',
    offerTile: '',
    offerDateTime: '',
    isActive: true,
    landArea: '',
    builtUpArea: '',
    height: '',
    numberOfApartments: 0,
    numberOfParking: 0,
    unitPerFloors: '',
    sizeOfEachApartment: '',
    latitude: '',
    longitude: '',
  };
  _project: Project = this.defaultProject;

  constructor(private projectsService: ProjectsService) {}

  onThumbnailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedThumbnail = input.files[0];
    }
  }

  onContentChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedContent = input.files[0];
    }
  }

  saveProject() {
    if (
      !this._project.name ||
      !this._project.category ||
      !this._project.type ||
      !this._project.offerDateTime
    ) {
      this.projectsService.showError(
        'Name, Category, Type, and Offer Date are required'
      );
      return;
    }
    const formData = new FormData();
    formData.append('name', this._project.name || '');
    formData.append('description', this._project.description || '');
    formData.append('address', this._project.address || '');
    formData.append('category', this._project.category || '');
    formData.append('type', this._project.type || '');
    formData.append('contentType', this.contentType || '');
    formData.append('offerTile', this._project.offerTile || '');
    formData.append('offerDateTime', this._project.offerDateTime || '');
    formData.append('landArea', this._project.landArea || '');
    formData.append('builtUpArea', this._project.builtUpArea || '');
    formData.append('height', this._project.height || '');
    formData.append(
      'numberOfApartments',
      this._project.numberOfApartments?.toString() || '0'
    );
    formData.append(
      'numberOfParking',
      this._project.numberOfParking?.toString() || '0'
    );
    formData.append('unitPerFloors', this._project.unitPerFloors || '');
    formData.append(
      'sizeOfEachApartment',
      this._project.sizeOfEachApartment || ''
    );
    formData.append('latitude', this._project.latitude || '');
    formData.append('longitude', this._project.longitude || '');
    if (this.selectedThumbnail) {
      formData.append('thumbnail', this.selectedThumbnail);
    }
    if (this.selectedContent) {
      formData.append('content', this.selectedContent);
    }
    if (this.mode === 'edit') {
      formData.append('id', this._project.id || '');
    }

    const serviceMethod =
      this.mode === 'create'
        ? this.projectsService.createProject(formData)
        : this.projectsService.editProject(formData);
    serviceMethod.subscribe({
      next: (response) => {
        this.projectsService.showSuccess(
          response ||
            `Project ${
              this.mode === 'create' ? 'created' : 'updated'
            } successfully`
        );
        this.saved.emit();
      },
      error: (error) => {
        this.projectsService.showError(
          `Failed to ${this.mode === 'create' ? 'create' : 'update'} Project: ${
            error.message || 'Unknown error'
          }`
        );
        console.error(error);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}

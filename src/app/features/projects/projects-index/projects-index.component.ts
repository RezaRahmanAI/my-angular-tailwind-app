import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { ProjectsFormComponent } from '../projects-form/projects-form.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-index',
  standalone: true,
  imports: [ProjectsFormComponent, CommonModule, RouterLink],
  templateUrl: './projects-index.component.html',
  styleUrls: ['./projects-index.component.css'],
})
export class ProjectsIndexComponent implements OnInit {
  projectsList: Project[] = [];
  showCreateModal = false;
  showEditModal = false;
  selectedProject: Project | null = null;
  apiBaseUrl = environment.baseUrl;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projectsList = data;
      },
      error: (error) => {
        this.projectsService.showError(
          'Failed to fetch Projects: ' + (error.message || 'Unknown error')
        );
        console.error(error);
      },
    });
  }

  openCreateModal() {
    this.selectedProject = null;
    this.showCreateModal = true;
  }

  openEditModal(project: Project) {
    this.selectedProject = { ...project };
    this.showEditModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.selectedProject = null;
  }

  onProjectSaved() {
    this.fetchProjects();
    this.closeModal();
  }

  deleteProject(id: string) {
    this.projectsService.deleteProject(id).subscribe({
      next: (response) => {
        this.projectsService.showSuccess(
          response || 'Project deleted successfully'
        );
        this.fetchProjects();
      },
      error: (error) => {
        this.projectsService.showError(
          `Failed to delete Project: ${error.message || 'Unknown error'}`
        );
        console.error(error);
      },
    });
  }

  toggleProjectActive(id: string, isActive: boolean) {
    this.projectsService.setProjectActiveInactive(id, isActive).subscribe({
      next: (response) => {
        this.projectsService.showSuccess(
          response ||
            `Project ${isActive ? 'activated' : 'deactivated'} successfully`
        );
        this.fetchProjects();
      },
      error: (error) => {
        this.projectsService.showError(
          `Failed to ${isActive ? 'activate' : 'deactivate'} Project: ${
            error.message || 'Unknown error'
          }`
        );
        console.error(error);
      },
    });
  }
}

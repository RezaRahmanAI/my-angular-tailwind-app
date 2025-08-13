import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiBaseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiBaseUrl}/api/project`);
  }

  createProject(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiBaseUrl}/api/project/create`, formData, {
      responseType: 'text',
    });
  }

  editProject(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiBaseUrl}/api/project/edit`, formData, {
      responseType: 'text',
    });
  }

  deleteProject(id: string): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/project/delete?id=${id}`,
      {},
      { responseType: 'text' }
    );
  }

  setProjectActiveInactive(id: string, isActive: boolean): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/project/itemactiveinactive?id=${id}&value=${isActive}`,
      {},
      { responseType: 'text' }
    );
  }

  showSuccess(message: string) {
    this.toastr.success(message, '', {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
    });
  }

  showError(message: string) {
    this.toastr.error(message, '', {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
    });
  }
}

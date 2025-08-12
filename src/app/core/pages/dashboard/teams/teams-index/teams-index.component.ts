import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { TeamFormComponent } from '../team-form/team-form.component';
import { CommonModule } from '@angular/common';

interface Team {
  id: string;
  name: string;
  designation: string;
  description: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  image: string;
  isActive: boolean;
  order: number;
}

@Component({
  selector: 'app-teams-index',
  standalone: true,
  imports: [CommonModule,TeamFormComponent],
  templateUrl: './teams-index.component.html',
  styleUrls: ['./teams-index.component.css'],
})
export class TeamsIndexComponent implements OnInit {
  teams: Team[] = [];
  showFormModal = false;
  selectedTeam: Team | null = null;
  formMode: 'create' | 'edit' = 'create';
  apiBaseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchTeams();
  }

  fetchTeams() {
    this.http.get<Team[]>(`${this.apiBaseUrl}/api/team`).subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch teams');
        console.error(error);
      },
    });
  }

  openCreateModal() {
    this.selectedTeam = null;
    this.formMode = 'create';
    this.showFormModal = true;
  }

  openEditModal(team: Team) {
    this.selectedTeam = { ...team };
    this.formMode = 'edit';
    this.showFormModal = true;
  }

  closeFormModal() {
    this.showFormModal = false;
    this.selectedTeam = null;
  }

  onTeamSaved() {
    this.fetchTeams();
    this.closeFormModal();
  }

  toggleActiveStatus(id: string, isActive: boolean) {
    this.http
      .post(
        `${this.apiBaseUrl}/api/team/itemactiveinactive?id=${id}&value=${isActive}`,
        {}
      )
      .subscribe({
        next: (response: any) => {
          this.toastr.success(
            response.message ||
              `Team ${isActive ? 'activated' : 'deactivated'} successfully`
          );
          this.fetchTeams();
        },
        error: (error) => {
          this.toastr.error('Failed to update team status');
          console.error(error);
        },
      });
  }

  deleteTeam(id: string) {
    this.http
      .post(`${this.apiBaseUrl}/api/team/delete?id=${id}`, {})
      .subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Team deleted successfully');
          this.fetchTeams();
        },
        error: (error) => {
          this.toastr.error('Failed to delete team');
          console.error(error);
        },
      });
  }
}

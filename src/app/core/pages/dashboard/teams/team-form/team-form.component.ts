import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';

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
  selector: 'app-team-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css'],
})
export class TeamFormComponent implements OnInit {
  @Input() set team(value: Team | null) {
    this._team = value ? { ...value } : { ...this.defaultTeam };
  }
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  selectedFile: File | null = null;
  apiBaseUrl = environment.baseUrl;

  private defaultTeam: Team = {
    id: '',
    name: '',
    designation: '',
    description: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    image: '',
    isActive: true,
    order: 0,
  };

  _team: Team = this.defaultTeam;

  ngOnInit() {
    if (!this._team) {
      this._team = { ...this.defaultTeam };
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveTeam() {
    const formData = new FormData();
    formData.append('name', this._team.name || '');
    formData.append('designation', this._team.designation || '');
    formData.append('description', this._team.description || '');
    formData.append('facebook', this._team.facebook || '');
    formData.append('twitter', this._team.twitter || '');
    formData.append('linkedin', this._team.linkedin || '');
    formData.append('order', this._team.order.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    if (this.mode === 'edit') {
      formData.append('id', this._team.id || '');
    }

    const endpoint =
      this.mode === 'create' ? '/api/team/create' : '/api/team/edit';
    this.http.post(`${this.apiBaseUrl}${endpoint}`, formData).subscribe({
      next: (response: any) => {
        this.toastr.success(
          response.message ||
            `Team ${
              this.mode === 'create' ? 'created' : 'updated'
            } successfully`
        );
        this.saved.emit();
      },
      error: (error) => {
        this.toastr.error(
          `Failed to ${this.mode === 'create' ? 'create' : 'update'} team`
        );
        console.error(error);
      },
    });
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {}
}

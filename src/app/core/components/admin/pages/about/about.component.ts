import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { About } from '../../../../models/About.model';
import { AboutService } from '../../../../services/about.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  aboutForm!: FormGroup;
  aboutData!: About | null;
  isSaving = false;

  constructor(private fb: FormBuilder, private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutForm = this.fb.group({
      mission: [''],
      vision: [''],
    });

    this.loadAbout();
  }

  loadAbout(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        console.log('Loaded about data:', data);

        if (data) {
          this.aboutData = data;
          this.aboutForm.patchValue({
            mission: data.mission,
            vision: data.vision,
          });
        } else {
          console.warn('No About data returned from backend.');
          this.aboutData = null;
        }
      },
      error: (err) => {
        console.error('Failed to load About info:', err);
        this.aboutData = null;
      },
    });
  }

  save(): void {
    const formValues = this.aboutForm.value;

    // If no existing data, fallback to id 1 or skip merging
    const updatedAbout: About = {
      id: this.aboutData?.id || 1, // fallback to ID 1
      mission: formValues.mission,
      vision: formValues.vision,
    };

    console.log('Saving about data:', updatedAbout);

    this.isSaving = true;
    this.aboutService.updateAbout(updatedAbout).subscribe({
      next: () => {
        alert('Updated successfully!');
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Failed to update:', err);
        alert('Failed to update: ' + err.message);
        this.isSaving = false;
      },
    });
  }
}

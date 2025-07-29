import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../../../models/Employee.model';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnChanges {
  @Input() editEmployee: Employee | null = null;
  @Output() employeeUpdated = new EventEmitter<{
    id: number;
    formData: FormData;
  }>();
  @Output() employeeCreated = new EventEmitter<FormData>();
  @Output() cancelled = new EventEmitter<void>();

  name = '';
  position = '';
  feedBack = '';
  imageFile?: File;
  isEditMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editEmployee'] && this.editEmployee) {
      this.name = this.editEmployee.name;
      this.position = this.editEmployee.position;
      this.feedBack = this.editEmployee.feedBack;
      this.imageFile = undefined; // User needs to reselect for editing
      this.isEditMode = true;
    } else {
      this.resetForm();
    }
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('position', this.position);
    formData.append('feedBack', this.feedBack || '');
    if (this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    if (this.editEmployee) {
      // emit update
      this.employeeUpdated.emit({ id: this.editEmployee.id, formData });
    } else {
      // emit create
      this.employeeCreated.emit(formData);
    }
  }

  cancel() {
    this.cancelled.emit();
  }

  private resetForm() {
    this.name = '';
    this.position = '';
    this.feedBack = '';
    this.imageFile = undefined;
    this.isEditMode = false;
  }
}

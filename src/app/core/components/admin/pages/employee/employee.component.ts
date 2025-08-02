import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { Employee } from '../../../../models/Employee.model';
import { EmployeeService } from '../../../../services/employee.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, CreateEmployeeComponent, ConfirmDialogComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  employees$?: Observable<Employee[]>;
  showCreateDialog = false;
  showConfirmDialog = false;
  employeeToDeleteId: number | null = null;
  editEmployee: Employee | null = null;

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }

  openCreateDialog() {
    this.showCreateDialog = true;
  }

  handleEmployeeCreated(formData: FormData) {
    this.employeeService.createEmployee(formData).subscribe(() => {
      this.loadEmployees();
      this.showCreateDialog = false;
    });
  }

  openEditDialog(employee: Employee) {
    this.editEmployee = employee;
    this.showCreateDialog = true;
  }

  handleEmployeeUpdated(event: { id: number; formData: FormData }) {
    console.log('Updating employee:', event);
    this.employeeService
      .updateEmployee(event.id, event.formData)
      .subscribe(() => {
        this.loadEmployees();
        this.showCreateDialog = false;
        this.editEmployee = null;
      });
  }

  cancelCreateDialog() {
    this.showCreateDialog = false;
    this.editEmployee = null;
  }

  openDeleteConfirmation(id: number) {
    this.employeeToDeleteId = id;
    this.showConfirmDialog = true;
  }

  onDeleteConfirmation(confirmed: boolean) {
    this.showConfirmDialog = false;
    if (confirmed && this.employeeToDeleteId !== null) {
      this.employeeService.deleteEmployee(this.employeeToDeleteId).subscribe({
        next: () => {
          this.loadEmployees();
          this.employeeToDeleteId = null;
        },
        error: (err) => console.error('Delete failed:', err),
      });
    }
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.employeeToDeleteId = null;
  }
}

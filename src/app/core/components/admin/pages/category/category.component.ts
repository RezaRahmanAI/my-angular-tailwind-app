import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    CreateCategoryComponent
],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private categoryService = inject(CategoryService);
  categories$?: Observable<Category[]>;
  showCreateDialog = false;
  showConfirmDialog = false;
  categoryToDeleteId: number | null = null;
  editCategory: Category | null = null;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  openCreateDialog() {
    this.showCreateDialog = true;
  }

  handleCategoryCreated(formData: FormData) {
    this.categoryService.createCategory(formData).subscribe(() => {
      this.loadCategories();
      this.showCreateDialog = false;
    });
  }

  openEditDialog(category: Category) {
    this.editCategory = category;
    this.showCreateDialog = true;
  }

  handleCategoryUpdated(event: { id: number; formData: FormData }) {
    this.categoryService
      .updateCategory(event.id, event.formData)
      .subscribe(() => {
        this.loadCategories();
        this.showCreateDialog = false;
        this.editCategory = null;
      });
  }

  cancelCreateDialog() {
    this.showCreateDialog = false;
    this.editCategory = null;
  }

  // cancelCreateDialog() {
  //   this.showCreateDialog = false;
  // }

  openDeleteConfirmation(id: number) {
    this.categoryToDeleteId = id;
    this.showConfirmDialog = true;
  }

  onDeleteConfirmation(confirmed: boolean) {
    this.showConfirmDialog = false;
    if (confirmed && this.categoryToDeleteId !== null) {
      this.categoryService.deleteCategory(this.categoryToDeleteId).subscribe({
        next: () => {
          this.loadCategories();
          this.categoryToDeleteId = null;
        },
        error: (err) => console.error('Delete failed:', err),
      });
    }
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.categoryToDeleteId = null;
  }
}

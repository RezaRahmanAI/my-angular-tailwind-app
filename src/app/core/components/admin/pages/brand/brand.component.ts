// src/app/components/admin/pages/brand/brand.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Brand } from '../../../../models/Brand.model';
import { BrandService } from '../../../../services/brand.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { CreateBrandComponent } from './create-brand/create-brand.component';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ConfirmDialogComponent,
    CreateBrandComponent,
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
  private brandService = inject(BrandService);
  brands$?: Observable<Brand[]>;
  showCreateDialog = false;
  showConfirmDialog = false;
  brandToDeleteId: number | null = null;
  editingBrand: Brand | null = null;

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.brands$ = this.brandService.getBrands();
  }

  openCreateDialog() {
    this.editingBrand = null;
    this.showCreateDialog = true;
  }

  editBrand(brand: Brand) {
    this.editingBrand = { ...brand }; // clone
    this.showCreateDialog = true;
  }

  handleBrandCreated(brandName: string) {
    if (this.editingBrand) {
      const updatedBrand: Brand = {
        ...this.editingBrand,
        name: brandName,
      };
      this.brandService.updateBrand(updatedBrand).subscribe({
        next: () => {
          this.loadBrands();
          this.cancelCreateDialog();
        },
        error: (error) => console.error('Error updating brand:', error),
      });
    } else {
      this.brandService.createBrand(brandName).subscribe({
        next: () => {
          this.loadBrands();
          this.cancelCreateDialog();
        },
        error: (error) => console.error('Error creating brand:', error),
      });
    }
  }

  cancelCreateDialog() {
    this.showCreateDialog = false;
    this.editingBrand = null;
  }

  openDeleteConfirmation(id: number) {
    this.brandToDeleteId = id;
    this.showConfirmDialog = true;
  }

  onDeleteConfirmation(confirmed: boolean) {
    this.showConfirmDialog = false;
    if (confirmed && this.brandToDeleteId !== null) {
      this.brandService.deleteBrand(this.brandToDeleteId).subscribe({
        next: () => {
          this.loadBrands();
          this.brandToDeleteId = null;
        },
        error: (error) => console.error('Error deleting brand:', error),
      });
    }
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.brandToDeleteId = null;
  }
}

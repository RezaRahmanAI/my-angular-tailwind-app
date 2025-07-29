import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent], 
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[]>;
  showConfirmDialog = false;
  productToDeleteId: number | null = null;
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getAll();
  }

  openDeleteConfirmation(id: number) {
    this.productToDeleteId = id;
    this.showConfirmDialog = true;
  }

  onDeleteConfirmation(confirmed: boolean) {
    this.showConfirmDialog = false;
    if (confirmed && this.productToDeleteId !== null) {
      this.productService.delete(this.productToDeleteId).subscribe({
        next: () => {
          this.loadProducts();
          this.productToDeleteId = null; 
        },
        error: (err) => console.error('Delete failed:', err),
      });
    }
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.productToDeleteId = null;
  }
}

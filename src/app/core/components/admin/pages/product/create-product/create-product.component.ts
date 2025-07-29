import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../../models/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';
import { BrandService } from '../../../../../services/brand.service';
import { Product } from '../../../../../models/product.model';
import { Brand } from '../../../../../models/Brand.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  brands: Brand[] = [];
  categories: Category[] = [];
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      grade: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    this.brandService.getBrands().subscribe((data) => (this.brands = data));
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.productId = +idParam;
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe((product) => {
      this.form.patchValue({
        name: product.name,
        grade: product.grade,
        description: product.description,
        brandId: product.brandId,
        categoryId: product.categoryId,
      });
      this.imagePreview = product.imageUrl;
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  cancel() {
    this.router.navigateByUrl('/admin/product');
  }

  save() {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('Name', this.form.value.name);
    formData.append('Grade', this.form.value.grade);
    formData.append('Description', this.form.value.description);
    formData.append('BrandId', this.form.value.brandId);
    formData.append('CategoryId', this.form.value.categoryId);
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }


    if (this.isEditMode && this.productId !== null) {
      this.productService.update(this.productId, formData).subscribe(() => {
        this.router.navigateByUrl('/admin/product');
      });
    } else {
      this.productService.create(formData).subscribe(() => {
        this.router.navigateByUrl('/admin/product');
      });
    }
  }
}

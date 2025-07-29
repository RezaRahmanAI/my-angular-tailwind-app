import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductListComponent } from './pages/product/product-list.component';
import { CreateProductComponent } from './pages/product/create-product/create-product.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { BrandComponent } from './pages/brand/brand.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { AdminContactComponent } from './pages/admin-contact/admin-contact.component';
import { AdminGalleryComponent } from './pages/admin-gallery/admin-gallery.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'category', component: CategoryComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'product/create', component: CreateProductComponent },
      { path: 'product/edit/:id', component: CreateProductComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'about', component: AboutComponent },
      { path: 'gallery', component: AdminGalleryComponent },
      { path: 'contact', component: AdminContactComponent },
    ],
  },
];

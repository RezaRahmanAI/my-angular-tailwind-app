import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../../models/category.model';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnChanges {
  @Input() editCategory: Category | null = null;
  @Output() categoryCreated = new EventEmitter<FormData>();
  @Output() categoryUpdated = new EventEmitter<{
    id: number;
    formData: FormData;
  }>();
  @Output() cancelled = new EventEmitter<void>();

  categoryName = '';
  categoryUrlHandle = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  fileTouched = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editCategory'] && this.editCategory) {
      this.categoryName = this.editCategory.name;
      this.categoryUrlHandle = this.editCategory.urlHandle;
      this.imagePreview = this.editCategory.imageUrl; // assuming this exists
    }
  }

  genarateUrlHandle() {
    this.categoryUrlHandle = this.categoryName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('Name', this.categoryName);
    formData.append('UrlHandle', this.categoryUrlHandle);
    if (this.selectedFile) formData.append('ImageFile', this.selectedFile);

    if (this.editCategory) {
      this.categoryUpdated.emit({ id: this.editCategory.id, formData });
    } else {
      this.categoryCreated.emit(formData);
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}

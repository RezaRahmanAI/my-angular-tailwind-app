import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Brand } from '../../../../../models/Brand.model';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-brand.component.html',
  styleUrl: './create-brand.component.css',
})
export class CreateBrandComponent implements OnChanges {
  @Input() brand: Brand | null = null; // <-- accept brand input
  @Output() brandCreated = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  brandName = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['brand'] && this.brand) {
      this.brandName = this.brand.name; // prefill name when editing
    }
  }

  createBrand() {
    if (!this.brandName.trim()) {
      console.log('Missing fields');
      return;
    }

    this.brandCreated.emit(this.brandName);
  }

  cancel() {
    this.cancelled.emit();
  }
}

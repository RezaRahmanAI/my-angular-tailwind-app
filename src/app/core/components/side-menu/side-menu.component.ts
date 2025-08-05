// side-menu.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() sideMenuOpen: boolean = false;
  @Output() closeMenuEvent = new EventEmitter<void>();

  handleMenuClick(section: string) {
    console.log(`Clicked on ${section} section`);
  }

  closeMenu() {
    this.closeMenuEvent.emit();
  }
}

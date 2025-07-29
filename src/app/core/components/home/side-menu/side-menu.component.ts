import { Component, Input } from '@angular/core';
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

  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  handleMenuClick(section: string) {
    console.log(`Clicked on ${section} section`);
  }
}

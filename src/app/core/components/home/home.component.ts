import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { HeroComponent } from './hero/hero.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, SideMenuComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sideMenuOpen = false;

  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }
}

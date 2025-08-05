import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { HomeComponent } from './core/pages/home/home.component';
import { FooterComponent } from './core/shared/footer/footer.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { FloatingSocialComponent } from "./core/components/floating-social/floating-social.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    SideMenuComponent,
    FloatingSocialComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-angular-tailwind-app';
  sideMenuOpen = false;

  onToggleMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  onCloseMenu() {
    this.sideMenuOpen = false;
  }
}

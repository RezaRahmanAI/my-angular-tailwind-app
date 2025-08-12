import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { FooterComponent } from './core/shared/footer/footer.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { FloatingSocialComponent } from './core/components/floating-social/floating-social.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SideMenuComponent,
    FloatingSocialComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-angular-tailwind-app';
  sideMenuOpen = false;
  isDashboardRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isDashboardRoute = event.urlAfterRedirects.includes('/dashboard');
      });
  }

  onToggleMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  onCloseMenu() {
    this.sideMenuOpen = false;
  }
}

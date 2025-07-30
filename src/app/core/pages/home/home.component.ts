import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { ProjectExploreComponent } from "../../components/project-explore/project-explore.component";
import { ProjectSliderComponent } from "../../components/project-slider/project-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, SideMenuComponent, FooterComponent, ProjectExploreComponent, ProjectSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sideMenuOpen = false;

  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }
}

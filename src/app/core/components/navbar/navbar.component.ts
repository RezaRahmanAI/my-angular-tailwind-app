import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() sideMenuOpen: boolean = false; // Receive menu state from parent
  @Output() toggleMenu = new EventEmitter<void>();

  isHidden = false;
  private lastScrollY = 0;
  private ticking = false;

  ngOnInit() {
    this.lastScrollY = window.scrollY;
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  toggleSideMenu() {
    this.toggleMenu.emit();
  }

  private onScroll = () => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > this.lastScrollY + 10 && current > 100) {
          this.isHidden = true;
        } else if (current + 50 < this.lastScrollY) {
          this.isHidden = false;
        }
        this.lastScrollY = current;
        this.ticking = false;
      });
      this.ticking = true;
    }
  };
}

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
  @Input() sideMenuOpen: boolean = false;
  @Output() toggleMenu = new EventEmitter<void>();

  isHidden = false;
  isAtTop = true; // NEW: track if at top
  showTransparent = false; // NEW: show transparent bg when scrolling up
  private lastScrollY = 0;
  private ticking = false;

  ngOnInit() {
    this.lastScrollY = window.scrollY;
    this.isAtTop = this.lastScrollY === 0;
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
        const scrollingDown = current > this.lastScrollY + 10;
        const scrollingUp = current + 50 < this.lastScrollY;

        this.isAtTop = current === 0;

        if (scrollingDown && current > 100) {
          this.isHidden = true;
          this.showTransparent = false;
        } else if (scrollingUp) {
          this.isHidden = false;
          this.showTransparent = true;
        }

        if (this.isAtTop) {
          this.showTransparent = false;
          this.isHidden = false;
        }

        this.lastScrollY = current;
        this.ticking = false;
      });
      this.ticking = true;
    }
  };
}

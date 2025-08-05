import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements AfterViewInit, OnChanges {
  @Input() sideMenuOpen: boolean = false;
  @Output() closeMenuEvent = new EventEmitter<void>();

  ngAfterViewInit() {
    // Initialize hover and continuous animations
    this.setupHoverAnimations();
    this.setupArrowAnimations();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sideMenuOpen']) {
      const isOpen = changes['sideMenuOpen'].currentValue;
      gsap.to('.side-menu', {
        x: isOpen ? 0 : '100%',
        duration: 0.8,
        ease: 'power3.out',
      });

      if (isOpen) {
        this.animateMenuOpen();
      }
    }
  }

  private animateMenuOpen() {
    // Sequential animations when menu opens
    gsap.from('.main-menu', {
      opacity: 0,
      x: 50,
      duration: 1.0,
      ease: 'power2.out',
      delay: 0.3,
    });

    gsap.from('.menu-section', {
      opacity: 0,
      x: -50,
      duration: 1.2,
      stagger: 0.4, // Increased stagger for slower sequential appearance
      ease: 'power2.out',
      delay: 0.5,
    });

    gsap.from('.menu-section h3', {
      opacity: 0,
      y: 15,
      duration: 1.2,
      stagger: 0.4,
      ease: 'power2.out',
      delay: 0.7,
    });

    gsap.from('.menu-option', {
      opacity: 0,
      y: 15,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.9,
    });

    gsap.from('.arrow-icon', {
      opacity: 0,
      y: 15,
      duration: 1.2,
      stagger: 0.4,
      ease: 'power2.out',
      delay: 1.1,
    });
  }

  private setupHoverAnimations() {
    // Hover animations for main menu items
    gsap.utils.toArray('.main-menu-item').forEach((item: any) => {
      gsap.to(item, {
        x: 10,
        backgroundColor: 'rgba(20, 184, 166, 0.3)', // Vibrant Teal
        duration: 0.4,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(item, { x: 10, backgroundColor: 'rgba(20, 184, 166, 0.3)', duration: 0.4 }),
          mouseleave: () => gsap.to(item, { x: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)', duration: 0.4 }),
        },
      });
    });

    // Hover animations for menu options
    gsap.utils.toArray('.menu-option').forEach((option: any) => {
      gsap.to(option, {
        y: -3,
        color: '#14B8A6',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        duration: 0.4,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(option, { y: -3, color: '#14B8A6', backgroundColor: 'rgba(255, 255, 255, 0.2)', duration: 0.4 }),
          mouseleave: () => gsap.to(option, { y: 0, color: 'rgba(255, 255, 255, 0.9)', backgroundColor: 'rgba(255, 255, 255, 0.1)', duration: 0.4 }),
        },
      });
    });

    // Hover animations for icons
    gsap.utils.toArray('.animate-gsap-icon').forEach((icon: any) => {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 5,
        duration: 0.4,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(icon, { scale: 1.2, rotation: 5, duration: 0.4 }),
          mouseleave: () => gsap.to(icon, { scale: 1, rotation: 0, duration: 0.4 }),
        },
      });
    });

    // Hover animation for close button
    gsap.to('.close-btn', {
      scale: 1.1,
      rotation: 90,
      duration: 0.4,
      ease: 'power1.out',
      paused: true,
      on: {
        mouseenter: () => gsap.to('.close-btn', { scale: 1.1, rotation: 90, duration: 0.4 }),
        mouseleave: () => gsap.to('.close-btn', { scale: 1, rotation: 0, duration: 0.4 }),
      },
    });
  }

  private setupArrowAnimations() {
    // Bounce animation for arrow icons
    gsap.to('.arrow-icon', {
      y: -10,
      duration: 1.0,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3,
    });
  }

  handleMenuClick(section: string) {
    console.log(`Clicked on ${section} section`);
  }

  closeMenu() {
    this.closeMenuEvent.emit();
  }
}
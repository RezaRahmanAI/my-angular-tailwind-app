import { Component, AfterViewInit } from '@angular/core';
import { BrandInfoComponent } from './brand-info/brand-info.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { ContactSocialComponent } from './contact-social/contact-social.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BrandInfoComponent, QuickLinksComponent, ContactSocialComponent, BottomBarComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Global footer fade-in
    gsap.from('.footer', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out',
    });

    // Scroll-triggered animation for footer visibility
    gsap.from('.footer-section > *', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}

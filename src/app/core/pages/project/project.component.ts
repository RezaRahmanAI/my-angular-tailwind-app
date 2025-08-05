import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProjectItem {
  id: number | string;
  name: string;
  category: string;
  type: string;
  thumbnail: string;
  location: string;
  canSchedule?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categorySelect') categorySelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('typeSelect') typeSelect!: ElementRef<HTMLSelectElement>;

  baseUrl = 'https://demo1.triconproperty.com';
  state = {
    list: [] as ProjectItem[],
  };

  constructor(private http: HttpClient) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.getProject();
  }

  ngAfterViewInit(): void {
    // Header animation
    gsap.from('.headering', {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.headering',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.page_title h1', {
      y: 20,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.4,
      scrollTrigger: {
        trigger: '.headering',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Filter bar animation
    gsap.from('.projects_search_bar', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects_search_bar',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.projects_search_bar select, .projects_search_bar button', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      stagger: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects_search_bar',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Project section animation
    gsap.from('.project_section', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.project_section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.utils.toArray('.project_card').forEach((card: any, index: number) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power2.out',
        delay: index * 0.4,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Hover animations for project cards
    gsap.utils.toArray('.project_card').forEach((card: any) => {
      gsap.to(card, {
        y: -4,
        boxShadow: '0 35px 60px -15px rgba(0,0,0,0.35)',
        duration: 0.4,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () =>
            gsap.to(card, {
              y: -4,
              boxShadow: '0 35px 60px -15px rgba(0,0,0,0.35)',
              duration: 0.4,
            }),
          mouseleave: () =>
            gsap.to(card, {
              y: 0,
              boxShadow: 'var(--shadow)',
              duration: 0.4,
            }),
        },
      });
    });

    // Hover animations for buttons
    gsap.utils.toArray('.project_card button').forEach((btn: any) => {
      gsap.to(btn, {
        y: -2,
        scale: 1.05,
        backgroundColor: 'var(--accent)',
        duration: 0.4,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () =>
            gsap.to(btn, {
              y: -2,
              scale: 1.05,
              backgroundColor: 'var(--accent)',
              duration: 0.4,
            }),
          mouseleave: () =>
            gsap.to(btn, {
              y: 0,
              scale: 1,
              backgroundColor: btn.classList.contains('btn-primary')
                ? 'var(--primary)'
                : 'transparent',
              duration: 0.4,
            }),
        },
      });
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  getProject(): void {
    const category = this.categorySelect?.nativeElement.value || 'all';
    const type = this.typeSelect?.nativeElement.value || 'all';

    const params = new URLSearchParams();
    if (category !== 'all') params.append('category', category);
    if (type !== 'all') params.append('type', type);

    this.http
      .get<ProjectItem[]>(
        `${this.baseUrl}/api/website/getprojects?${params.toString()}`
      )
      .subscribe({
        next: (data) => {
          this.state.list = data;
        },
        error: (err) => {
          console.error('Error fetching projects:', err);
          this.state.list = [];
        },
      });
  }

  resetFilters(): void {
    if (this.categorySelect) this.categorySelect.nativeElement.value = 'all';
    if (this.typeSelect) this.typeSelect.nativeElement.value = 'all';
    this.getProject();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== '/images/fallback.png') {
      img.src = '/images/fallback.png';
    }
  }
}

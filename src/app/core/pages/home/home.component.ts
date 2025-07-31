import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import { HttpClient } from '@angular/common/http'; // Commented out
// import { environment } from '../../environments/environment'; // Commented out
import { trigger, transition, style, animate } from '@angular/animations';
import { ProjectSliderComponent } from "../../components/project-slider/project-slider.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allows swiper-container and swiper-slide
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.3s ease-out', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ transform: 'scale(0)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef<HTMLElement>;
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDivElement>;

  // baseUrl = environment.apiBaseUrl; // Commented out
  baseUrl = 'https://dummy.com'; // Dummy base URL for image paths

  state = {
    testis: [
      {
        image: 'dummy-testimonial-1.jpg',
        name: 'John Doe',
        description: 'This is a great service! Highly recommended.',
      },
      {
        image: 'dummy-testimonial-2.jpg',
        name: 'Jane Smith',
        description: 'Amazing experience with the team.',
      },
    ],
    list: [
      {
        id: 1,
        name: 'Project One',
        type: 'Residential',
        address: 'Dhaka, BD',
        thumbnail: 'dummy-project-1.jpg',
        category: 'Featured',
      },
      {
        id: 2,
        name: 'Project Two',
        type: 'Commercial',
        address: 'Chattogram, BD',
        thumbnail: 'dummy-project-2.jpg',
        category: 'Featured',
      },
      {
        id: 3,
        name: 'Project Three',
        type: 'Mixed Use',
        address: 'Khulna, BD',
        thumbnail: 'dummy-project-3.jpg',
        category: 'Featured',
      },
    ],
    offer: {
      picture: 'dummy-offer.jpg',
    },
  };
  currentIndex = 0;
  isModalVisible = false;

  ngOnInit(): void {
    // Commenting out API calls
    // this.getOffer();
    // this.getProject();
    // this.getTestimonials();
  }

  ngAfterViewInit(): void {
    if (this.swiperRef) {
      console.log('Initializing Swiper on:', this.swiperRef.nativeElement);
      new Swiper(this.swiperRef.nativeElement, {
        modules: [Navigation, Pagination],
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        effect: 'slide',
        navigation: {
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 1, spaceBetween: 15 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
          1280: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
      console.log('Swiper initialized');
    } else {
      console.error('swiperRef not found');
    }
  }

  // constructor(private http: HttpClient) {} // Commented out
  constructor() {}

  // Commenting out API call methods
  /*
  getOffer(): void {
    this.http.get<any>(`${this.baseUrl}/api/website/getoffers`).subscribe({
      next: (data) => {
        this.state.offer = data;
        console.log(this.state.offer);
      },
      error: (err) => console.error('Error fetching offer:', err),
    });
  }

  getProject(): void {
    this.http.get<any>(`${this.baseUrl}/api/website/getprojects`).subscribe({
      next: (data) => {
        this.state.list = data;
      },
      error: (err) => console.error('Error fetching projects:', err),
    });
  }

  getTestimonials(): void {
    this.http.get<any>(`${this.baseUrl}/api/website/gettestimonials`).subscribe({
      next: (data) => {
        this.state.testis = data;
      },
      error: (err) => console.error('Error fetching testimonials:', err),
    });
  }
  */

  prevTestimonial(): void {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.state.testis.length - 1;
  }

  nextTestimonial(): void {
    this.currentIndex =
      this.currentIndex < this.state.testis.length - 1
        ? this.currentIndex + 1
        : 0;
  }

  onToggle(): void {
    this.isModalVisible = !this.isModalVisible;
  }
}

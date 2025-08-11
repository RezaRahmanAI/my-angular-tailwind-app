import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  baseURL = environment.baseUrl;
  blogId!: string;

  data = signal<any>(null);
  list = signal<any[]>([]);
  countdowns = signal<string[]>([]);
  countdown = signal<any>(null);
  offerActive = signal<boolean>(true);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id') || '';
    this.getBlog();
    this.getBlogs();
  }

  getBlog() {
    this.http
      .get(`${this.baseURL}/api/website/getsingleblog?blogId=${this.blogId}`)
      .subscribe((res: any) => {
        this.data.set(res);
      });
  }

  getBlogs() {
    this.http
      .get(`${this.baseURL}/api/website/getblogs`)
      .subscribe((res: any) => {
        this.list.set(res);
        this.startCountdown();
      });
  }

  startCountdown() {
    this.updateCountdowns();
    setInterval(() => this.updateCountdowns(), 1000);
  }

  updateCountdowns() {
    const now = new Date();

    const blog = this.data();
    if (!blog || !blog.offerDate) {
      this.offerActive.set(false);
      this.countdown.set(null);
    } else {
      const diff = new Date(blog.offerDate).getTime() - now.getTime();
      if (diff > 0) {
        this.countdown.set(this.calcTime(diff));
        this.offerActive.set(true);
      } else {
        this.countdown.set(this.zeroTime());
        this.offerActive.set(false);
      }
    }

    this.countdowns.set(
      this.list().map((item) => {
        if (!item.offerDate) return 'No Offer';
        const diff = new Date(item.offerDate).getTime() - now.getTime();
        return diff > 0
          ? `${this.pad(Math.floor(diff / 86400000))} Days ${this.pad(
              Math.floor((diff / 3600000) % 24)
            )}:${this.pad(Math.floor((diff / 60000) % 60))}:${this.pad(
              Math.floor((diff / 1000) % 60)
            )}`
          : 'Offer Expired';
      })
    );
  }

  calcTime(diff: number) {
    return {
      days: this.pad(Math.floor(diff / 86400000)),
      hours: this.pad(Math.floor((diff / 3600000) % 24)),
      minutes: this.pad(Math.floor((diff / 60000) % 60)),
      seconds: this.pad(Math.floor((diff / 1000) % 60)),
    };
  }

  zeroTime() {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }

  pad(n: number) {
    return String(n).padStart(2, '0');
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image?: string;
  description?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements AfterViewInit {
  @Input() team: TeamMember[] = [];
  @Output() toggle = new EventEmitter<TeamMember | null>();

  ngAfterViewInit() {
    gsap.from('.our_team h2', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power2.out',
    });
    gsap.from('.team_card', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      stagger: 0.4,
      ease: 'power2.out',
      delay: 0.3,
    });
    gsap.utils.toArray('.team_card').forEach((card: any) => {
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
              boxShadow: '0 25px 60px -10px rgba(0,0,0,0.12)',
              duration: 0.4,
            }),
        },
      });
    });
    gsap.utils.toArray('.team_card a').forEach((link: any) => {
      gsap.to(link, {
        y: -2,
        scale: 1.1,
        duration: 0.4,
        ease: 'power1.out',
        paused: true,
        on: {
          mouseenter: () => gsap.to(link, { y: -2, scale: 1.1, duration: 0.4 }),
          mouseleave: () => gsap.to(link, { y: 0, scale: 1, duration: 0.4 }),
        },
      });
    });
  }

  onToggle(member: TeamMember) {
    this.toggle.emit(member);
  }
}

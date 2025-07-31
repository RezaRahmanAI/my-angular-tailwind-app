import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  description: string;
  facebook: string;
  twiter: string;
  linkthen: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('fadeScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ opacity: 0, transform: 'scale(0.9)' })
        ),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDivElement>;

  baseUrl = 'https://dummy.com'; // Dummy base URL for image paths

  state = {
    about: {
      history:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work. In almost the decade long of active participation in this real estate development industry. When we started Tricon Properties Ltd, we were determined to build teams with the best and brightest talents in the Industry. I would like to thank my teams and workers of Tricon Properties. Furthermore, we would like to dedicate the success of this organization to their hard work and talented efforts. Their contribution, quality of service, and sincerity are the stepping stones of the success of this company. Most importantly, my sincere thanks go to the people of Rajshahi for positioning Tricon Properties to where it is today. Our client relationships are built on mutual trust and respect. In essence, it is the love and appreciation of our venerable clients that encourage us to do more and work towards building a sustainable development community in Rajshahi. Thank you.',
      ownerName: 'John Smith',
      ownerDesignation: 'CEO & Founder',
      ownerSpece:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work. In almost the decade long of active participation in this real estate development industry. When we started Tricon Properties Ltd, we were determined to build teams with the best and brightest talents in the Industry. I would like to thank my teams and workers of Tricon Properties. Furthermore, we would like to dedicate the success of this organization to their hard work and talented efforts. Their contribution, quality of service, and sincerity are the stepping stones of the success of this company. Most importantly, my sincere thanks go to the people of Rajshahi for positioning Tricon Properties to where it is today. Our client relationships are built on mutual trust and respect. In essence, it is the love and appreciation of our venerable clients that encourage us to do more and work towards building a sustainable development community in Rajshahi. Thank you.',
      ownerImage: '/images/employee/employee-1.jpg',
      mission:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work. In almost the decade long of active participation in this real estate development industry. When we started Tricon Properties Ltd, we were determined to build teams with the best and brightest talents in the Industry. I would like to thank my teams and workers of Tricon Properties. Furthermore, we would like to dedicate the success of this organization to their hard work and talented efforts. Their contribution, quality of service, and sincerity are the stepping stones of the success of this company. Most importantly, my sincere thanks go to the people of Rajshahi for positioning Tricon Properties to where it is today. Our client relationships are built on mutual trust and respect. In essence, it is the love and appreciation of our venerable clients that encourage us to do more and work towards building a sustainable development community in Rajshahi. Thank you.',
      messionImage: 'dummy-mission.jpg',
      vission:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work. In almost the decade long of active participation in this real estate development industry. When we started Tricon Properties Ltd, we were determined to build teams with the best and brightest talents in the Industry. I would like to thank my teams and workers of Tricon Properties. Furthermore, we would like to dedicate the success of this organization to their hard work and talented efforts. Their contribution, quality of service, and sincerity are the stepping stones of the success of this company. Most importantly, my sincere thanks go to the people of Rajshahi for positioning Tricon Properties to where it is today. Our client relationships are built on mutual trust and respect. In essence, it is the love and appreciation of our venerable clients that encourage us to do more and work towards building a sustainable development community in Rajshahi. Thank you.',
      vissionImage: 'dummy-vision.jpg',
    },
    team: [
      {
        id: 1,
        name: 'Alice Johnson',
        designation: 'Project Manager',
        image: 'dummy-team-1.jpg',
        description:
          'Experienced in managing large-scale construction projects.',
        facebook: 'https://facebook.com/alice',
        twiter: 'https://twitter.com/alice',
        linkthen: 'https://linkedin.com/in/alice',
      },
      {
        id: 2,
        name: 'Bob Williams',
        designation: 'Architect',
        image: 'dummy-team-2.jpg',
        description: 'Specializes in modern architectural designs.',
        facebook: 'https://facebook.com/bob',
        twiter: 'https://twitter.com/bob',
        linkthen: 'https://linkedin.com/in/bob',
      },
    ],
    selectedTeamMember: null as TeamMember | null,
  };
  isModalVisible = false;

  ngOnInit(): void {
    // No API calls for now
  }

  constructor() {}

  onToggle(member: TeamMember | null = null): void {
    console.log('Toggling modal with member:', member);
    if (member) {
      this.state.selectedTeamMember = { ...member }; // Create a copy to avoid reference issues
    } else {
      this.state.selectedTeamMember = null;
    }
    this.isModalVisible = !this.isModalVisible;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HistoryComponent } from './history/history.component';
import { OwnerSpeechComponent } from './owner-speech/owner-speech.component';
import { MissionVisionComponent } from './mission-vision/mission-vision.component';
import { TeamComponent } from './team/team.component';
import { TeamModalComponent } from './team-modal/team-modal.component';

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
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    HistoryComponent,
    OwnerSpeechComponent,
    MissionVisionComponent,
    TeamComponent,
    TeamModalComponent,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  baseUrl = 'https://dummy.com';

  state: {
    about: {
      history?: string;
      ownerName?: string;
      ownerDesignation?: string;
      ownerSpeech?: string;
      ownerImage?: string;
      mission?: string;
      missionImage?: string;
      vision?: string;
      visionImage?: string;
    };
    team: TeamMember[];
    selectedTeamMember: TeamMember | null;
  } = {
    about: {
      history:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work...',
      ownerName: 'John Smith',
      ownerDesignation: 'CEO & Founder',
      ownerSpeech:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work...',
      ownerImage: '/images/employee/employee-1.jpg',
      mission:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work...',
      missionImage: '/images/employee/employee-1.jpg',
      vision:
        'At first, I would like to thank God, the almighty for allowing us to serve the Dhaka community with honesty, integrity, and hard work...',
      visionImage: '/images/employee/employee-1.jpg',
    },
    team: [
      {
        id: 1,
        name: 'Alice Johnson',
        designation: 'Project Manager',
        image: '/images/employee/employee-1.jpg',
        description:
          'Experienced in managing large-scale construction projects.',
        facebook: 'https://facebook.com/alice',
        twitter: 'https://twitter.com/alice',
        linkedin: 'https://linkedin.com/in/alice',
      },
      {
        id: 2,
        name: 'Bob Williams',
        designation: 'Architect',
        image: '/images/employee/employee-2.jpg',
        description: 'Specializes in modern architectural designs.',
        facebook: 'https://facebook.com/bob',
        twitter: 'https://twitter.com/bob',
        linkedin: 'https://linkedin.com/in/bob',
      },
    ],
    selectedTeamMember: null,
  };

  isModalVisible = false;

  ngOnInit(): void {
    // Placeholder for future API initialization
  }

  onToggle(member: TeamMember | null = null): void {
    this.state.selectedTeamMember = member ? { ...member } : null;
    this.isModalVisible = !this.isModalVisible;
  }

  onImageError(event: Event, fallback = '/images/fallback.png'): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== fallback) {
      img.src = fallback;
    }
  }
}

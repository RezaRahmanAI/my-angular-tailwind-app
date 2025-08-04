import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data-service.service';


@Component({
  selector: 'app-projects-explore',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-explore.component.html',
  styleUrls: ['./projects-explore.component.css'],
  providers: [DataService],
})
export class ProjectsExploreComponent implements OnInit {
  categories = [
    {
      link: '/projectcategoryOngoing',
      title: 'Ongoing Projects',
      image: 'assets/images/banner-3.png',
    },
    {
      link: '/projectcategoryUpcoming',
      title: 'Upcoming Projects',
      image: 'assets/images/banner_1.jpg',
    },
    {
      link: '/projectcategoryCompleted',
      title: 'Complete Projects',
      image: 'assets/images/banner-3.png',
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}

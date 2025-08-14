import { Routes } from '@angular/router';
import { AboutComponent } from './core/pages/about/about.component';
import { HomeComponent } from './core/pages/home/home.component';
import { ProjectsComponent } from './core/pages/project/project.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { LandownerComponent } from './core/pages/landowner/landowner.component';
import { GalleryComponent } from './core/pages/gallery/gallery.component';
import { BlogsEventsComponent } from './core/pages/blogs-events/blogs-events.component';
import { ProjectDetailsComponent } from './core/pages/project-details/project-details.component';
import { BlogListComponent } from './core/pages/blog-list/blog-list.component';
import { BlogDetailsComponent } from './core/pages/blog-details/blog-details.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/pipes/auth-guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TeamsComponent } from './features/teams/teams.component';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home.component';
import { TeamsIndexComponent } from './features/teams/teams-index/teams-index.component';
import { BlogsIndexComponent } from './features/blogs/blogs-index/blogs-index.component';
import { TestimonialsIndexComponent } from './features/testimonials/testimonials-index/testimonials-index.component';
import { OffersIndexComponent } from './features/offers/offers-index/offers-index.component';
import { AboutUsIndexComponent } from './features/about-us/about-us-index/about-us-index.component';
import { ProjectsIndexComponent } from './features/projects/projects-index/projects-index.component';
import { ProjectEditComponent } from './features/projects/project-edit/project-edit.component';
import { ProjectFeaturesComponent } from './features/projects/project-features/project-features.component';
import { ProjectGalleryComponent } from './features/projects/project-gallery/project-gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'projectdetails/:id', component: ProjectDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'landowner', component: LandownerComponent },
  { path: 'blogs-events', component: BlogsEventsComponent },
  { path: 'blog-list', component: BlogListComponent },
  { path: 'blog-details/:id', component: BlogDetailsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'teams', component: TeamsIndexComponent },
      { path: 'blogs', component: BlogsIndexComponent },
      { path: 'testimonials', component: TestimonialsIndexComponent },
      { path: 'offers', component: OffersIndexComponent },
      { path: 'about-us', component: AboutUsIndexComponent },
      {
        path: 'projects',
        children: [
          { path: '', component: ProjectsIndexComponent },
          { path: ':id/edit', component: ProjectEditComponent },
          { path: ':id/features', component: ProjectFeaturesComponent },
          { path: ':id/gallery', component: ProjectGalleryComponent },
        ],
      },
    ],
  },
];

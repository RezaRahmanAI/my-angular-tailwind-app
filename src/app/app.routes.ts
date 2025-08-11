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

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'project',
    component: ProjectsComponent,
  },
  { path: 'projectdetails/:id', component: ProjectDetailsComponent },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'landowner',
    component: LandownerComponent,
  },
  {
    path: 'blogs-events',
    component: BlogsEventsComponent,
  },
  {
    path: 'blog-list',
    component: BlogListComponent,
  },
  { path: 'blogDetails/:id', component: BlogDetailsComponent },
  {
    path: 'blogs-events',
    component: BlogsEventsComponent,
  },
];

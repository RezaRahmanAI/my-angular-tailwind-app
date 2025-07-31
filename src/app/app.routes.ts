import { Routes } from '@angular/router';
import { AboutComponent } from './core/pages/about/about.component';
import { HomeComponent } from './core/pages/home/home.component';
import { ProjectsComponent } from './core/pages/project/project.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { LandownerComponent } from './core/pages/landowner/landowner.component';
import { GalleryComponent } from './core/pages/gallery/gallery.component';

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
];

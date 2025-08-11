import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // <-- add this import
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig?.providers ?? []),
    provideAnimations(),
    provideHttpClient(), // <-- add this provider
  ],
}).catch((err) => console.error(err));

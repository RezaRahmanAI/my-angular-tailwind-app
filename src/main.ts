import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // <-- add this import
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig?.providers ?? []),
    provideAnimations(),
    provideHttpClient(),
    provideToastr(),
  ],
}).catch((err) => console.error(err));

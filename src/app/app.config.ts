import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {NgxsModule, provideStore} from '@ngxs/store';
import {provideHttpClient} from '@angular/common/http';
import {CatState} from './state/cat.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore( [],),
    importProvidersFrom(
      NgxsModule.forRoot([CatState])
    )
  ]
};

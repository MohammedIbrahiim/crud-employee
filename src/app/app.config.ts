import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpErrorInterceptor } from './core/interceptor/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()), provideClientHydration(),  provideHttpClient(  withInterceptors([HttpErrorInterceptor]),), provideAnimationsAsync(),
  
  ]
};

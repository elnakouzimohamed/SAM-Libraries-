/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withFetch } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  ...appConfig, // Spread existing app config
  providers: [
    provideRouter(routes),  // Provide routes
    provideHttpClient(withFetch()),  // Provide HttpClient with fetch API enabled
  ],
})
  .catch((err) => console.error(err));
  
  

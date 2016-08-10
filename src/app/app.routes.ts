import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { EventComponent } from './event';

export const routes: RouterConfig = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: EventComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

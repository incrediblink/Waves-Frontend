import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about';
import { EventComponent } from './event';
import { EventCenterComponent } from './event/center';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: EventCenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: ':id', component: EventComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

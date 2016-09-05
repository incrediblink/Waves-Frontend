import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about';
import { EventComponent } from './event';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: EventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

export const routing = RouterModule.forRoot(routes);

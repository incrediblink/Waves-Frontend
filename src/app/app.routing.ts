import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about';
import { EventComponent } from './event';
import { LoginComponent } from './login';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: EventComponent },
  { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(routes);

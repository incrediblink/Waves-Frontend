import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about';
import { EventComponent } from './event';
import { EventCenterComponent } from './event/center';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';
import { RegisterComponent } from './register';
import { VerifyComponent } from './register/verify';
import { AdminComponent } from './admin';
import { TagComponent } from './tag';
import { TagCenterComponent } from './tag/center';
import { MyComponent } from './my';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/event', pathMatch: 'full' },
  { path: 'event', component: EventCenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify/:id', component: VerifyComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/:section', component: AdminComponent },
  { path: 'tag', component: TagCenterComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'my', component: MyComponent },
  { path: 'my/:section', component: MyComponent },
  { path: 'event/:id', component: EventComponent },
  { path: '', redirectTo: '/event', pathMatch: 'prefix' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

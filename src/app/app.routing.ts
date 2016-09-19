import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about';
import { EventComponent } from './event';
import { EventCenterComponent } from './event/center';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';
import { RegisterComponent } from './register';
import { AdminComponent } from './admin';
import { TagComponent } from './tag';
import { TagCenterComponent } from './tag/center';
import { SettingComponent } from './setting';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: EventCenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'tag', component: TagCenterComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'setting', component: SettingComponent },
  { path: ':id', component: EventComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

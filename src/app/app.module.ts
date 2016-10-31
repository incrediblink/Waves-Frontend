import { NgModule, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule, AlertModule, TabsModule, ModalModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service';
// import { MetaConfig, MetaModule } from 'ng2-meta';

import { AppComponent } from './app.component';
import { AboutComponent } from './about';
import { EventComponent } from './event';
import { EventCenterComponent } from './event/center';
import { TagComponent } from './tag';
import { TagCenterComponent } from './tag/center';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';
import { RegisterComponent } from './register';
import { VerifyComponent } from './register/verify';
import { AdminComponent } from './admin';
import { TagAdminComponent } from './admin/tag';
import { NewsAdminComponent } from './admin/news';
import { EventAdminComponent } from './admin/event';
import { UserAdminComponent } from './admin/user';
import { MyComponent } from './my';
import { MyEventComponent } from './my/event';
import { MySettingComponent } from './my/setting';
import { routing, appRoutingProviders } from './app.routing';

import { GlobalService } from './global';
import { AlertService } from './service/alert';
import { ValidationService } from './const/validation.service';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// const metaConfig: MetaConfig = {
//   defaults: {
//     title: '浪潮 - 渴望重回土地',
//     description: '如果你想记住那些曾使你牵挂的事件，这里或许是个好地方。'
//   }
// };

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    TooltipModule,
    AlertModule,
    TabsModule,
    ModalModule,
    DropdownModule
    // MetaModule.forRoot(metaConfig)
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    EventComponent,
    EventCenterComponent,
    TagComponent,
    TagCenterComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    VerifyComponent,
    AdminComponent,
    TagAdminComponent,
    NewsAdminComponent,
    EventAdminComponent,
    UserAdminComponent,
    MyComponent,
    MyEventComponent,
    MySettingComponent
  ],
  providers: [
    Title,
    CookieService,
    GlobalService,
    AlertService,
    ValidationService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

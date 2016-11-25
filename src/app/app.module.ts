import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { TooltipModule, AlertModule, TabsModule, ModalModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { Cookie } from 'ng2-cookies/ng2-cookies';
// import { MetadataSettings, PageTitlePositioning, MetadataService, MetadataModule } from 'ng2-metadata';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
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
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { GlobalService } from './global';
import { ValidationService } from './const/validation.service';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

// const metaConfig: MetaConfig = {
//     defaults: {
//         title: '浪潮 - 渴望重回土地',
//         description: '如果你想记住那些曾使你牵挂的事件，这里或许是个好地方。'
//     }
// };
//
// const metadataSettings: MetadataSettings = {
//   pageTitlePositioning : PageTitlePositioning.PrependPageTitle,
//   pageTitleSeparator : ' | ',
//   applicationName : '浪潮 - 渴望重回土地',
//   defaults : {
//     title : '欢迎',
//     description : '在这里，记住那些使你心动的事件。'
//   }
// };


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ AppComponent ],
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
    exports: [
        BrowserModule,
        ToastyModule
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        TooltipModule,
        AlertModule,
        TabsModule,
        ModalModule,
        DropdownModule,
        ToastyModule.forRoot()
        // MetadataModule.forRoot(metadataSettings)
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS,
        Title,
        GlobalService,
        ValidationService,
        Cookie
    ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}


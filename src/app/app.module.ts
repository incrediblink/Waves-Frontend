import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import { TooltipModule } from 'ng2-bootstrap/components/tooltip';

@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule, HTTP_PROVIDERS, APP_ROUTER_PROVIDERS],
    bootstrap:    [AppComponent],
})
export class AppModule {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { TAB_DIRECTIVES } from 'ng2-bootstrap';

import { ApiService } from './shared';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [ApiService],
  directives: [...ROUTER_DIRECTIVES, TAB_DIRECTIVES, CORE_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public tabs:Array<any> = [
    {title: 'Home', content: ''},
    {title: 'Event', content: 'event', disabled: true},
    {title: 'About', content: 'about', disabled: true}
  ];

  public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };

  constructor(private api: ApiService) {
  }
}

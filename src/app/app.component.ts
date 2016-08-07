import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { TAB_DIRECTIVES } from 'ng2-bootstrap';

import { ApiService } from './shared';
import { LoadingService } from './service/loading';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'my-app', // <my-app></my-app>
    providers: [ApiService, LoadingService],
    directives: [...ROUTER_DIRECTIVES, TAB_DIRECTIVES, CORE_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public nav: Array<any> = [
        {title: 'Home', link: '/'},
        {title: 'Event', link: '/event'},
        {title: 'About', link: '/about'}
    ];
    public isHidden: Boolean = true;
    constructor(private api: ApiService, private loading: LoadingService, private router: Router) {}

    ngOnInit(){
        this.loading.draw(document.getElementById('loading'));
    }

    finishLoading(){
        console.log('loaded!');
        this.isHidden = false;
        console.log(this.isHidden);
    }
}

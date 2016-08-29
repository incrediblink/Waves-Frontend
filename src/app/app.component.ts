import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { TAB_DIRECTIVES } from 'ng2-bootstrap';
import { ApiService } from './shared';
// import { LoadingService } from './service/loading';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'waves', // <my-app></my-app>
    providers: [ApiService],
    directives: [...ROUTER_DIRECTIVES, TAB_DIRECTIVES, CORE_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public tabs: Array<any> = [
        {title: '事件', link: '/', icon: 'icon-event'},
        {title: '标签', link: '/tag', icon: 'icon-tag'},
        {title: '主页', link: '/home', icon: 'icon-home'},
    ];
    public isHidden: Boolean = true;

    constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private ref: ChangeDetectorRef) {}

    // ngOnInit(){
    //     this.loading.draw(document.getElementById('loading'));
    // }

    // finishLoading(){
    //     console.log('loaded!');
    //     this.isHidden = false;
    //     console.log(this.isHidden);
    //     this.ref.detectChanges();
    // }
}

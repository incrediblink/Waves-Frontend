import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { ApiService } from './shared';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'waves',
    providers: [ApiService],
    directives: [...ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES, CORE_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public tabs: Array<any> = [
        { title: '事件', link: '/', icon: 'fa-newspaper-o' },
        { title: '标签', link: '/tag', icon: 'fa-tags' },
        { title: '我的', link: '/home', icon: 'fa-home' }
    ];

    public tabsBottom: [any] = [
        { title: '后台', link: '/admin', icon: 'fa-lock' },
        { title: '关于', link: '/about', icon: 'fa-book' },
        { title: '登入', link: '/login', icon: 'fa-sign-in' }
    ];

    public isHidden: Boolean = true;

    constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.ref.detectChanges();
    }
}

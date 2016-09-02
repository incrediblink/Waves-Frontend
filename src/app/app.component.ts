import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';

import './rxjs-operators';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'waves',
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

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private ref: ChangeDetectorRef, private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.ref.detectChanges();
    }
}

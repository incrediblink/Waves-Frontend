import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, DoCheck, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { UserService } from './service/user';
import { Location } from '@angular/common';
import { ToastyService, ToastyConfig, ToastOptions, ToastyComponent } from 'ng2-toasty';
// import { MetaService } from 'ng2-meta';

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
    providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
    public tabs: Array<any> = [
        { title: '事件', link: '/event', icon: 'fa-newspaper-o' },
        { title: '标签', link: '/tag', icon: 'fa-tags' },
        { title: '我的', link: '/my', icon: 'fa-home' }
    ];

    public tabsBottom: [any] = [
        { title: '后台', link: '/admin', icon: 'fa-lock', visible: 0 },
        { title: '关于 & 使用指南', link: '/about', icon: 'fa-question-circle', visible: 1 },
        { title: '登录', link: '/login', icon: 'fa-sign-in', visible: 1 }
    ];

    private cookie;

    public isHidden: Boolean = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef,
        private cookieService: CookieService,
        private location: Location,
        private userService: UserService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig
        // private metaService: MetaService
    ) {
        this.viewContainerRef = viewContainerRef;
        this.toastyConfig.theme = 'bootstrap';
    }

    ngDoCheck() {
        if (this.cookie !== (this.cookieService.get('waves_permission') || ' ')) {
            this.tabsBottom[2] = this.cookieService.get('waves_permission')
                ? { title:  '登出', link: '/logout', icon: 'fa-sign-out', visible: 1 }
                : { title:  '登录', link: '/login', icon: 'fa-sign-in', visible: 1 }

            if (this.cookieService.get('waves_permission'))
                this.tabsBottom[0].visible =
                    JSON.parse(this.cookieService.get('waves_permission')).includes('Admin') ? 1 : 0;
            else
                this.tabsBottom[0].visible = 0;

            this.ref.detectChanges();
            this.cookie = this.cookieService.get('waves_permission') || ' ';
        }
    }

    ngOnInit() {
        this.cookie = this.cookieService.get('waves_permission') || ' ';
        if (this.cookieService.get('waves_permission'))
            this.tabsBottom[0].visible =
                JSON.parse(this.cookieService.get('waves_permission')).includes('Admin') ? 1 : 0;
        this.tabsBottom[2] = this.cookieService.get('waves_permission')
            ? { title:  '登出', link: '/logout', icon: 'fa-sign-out', visible: 1 }
            : { title:  '登录', link: '/login', icon: 'fa-sign-in', visible: 1 };
        this.ref.detectChanges();

        setInterval(() => {
            if (this.location.isCurrentPathEqualTo('/my/setting') || this.location.isCurrentPathEqualTo('/event')) {
                this.userService.renew()
                  .subscribe(() => {});
            }
        }, 1000);
    }
}

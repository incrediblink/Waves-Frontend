import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { GlobalService } from '../global';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    public tabs = [
        {
            title: '新闻',
            icon: 'fa-file-text-o',
            hidden: false,
            path: 'news'
        }, {
            title: '事件',
            icon: 'fa-newspaper-o',
            hidden: true,
            path: 'event'
        }, {
            title: '标签',
            icon: 'fa-tags',
            hidden: true,
            path: 'tag'
        }, {
            title: '用户',
            icon: 'fa-user',
            hidden: true,
            path: 'user'
        }
    ];

    public switchTab = (title) => {
        for (let tab of this.tabs) {
            tab.hidden = true;
        }
        for (let tab of this.tabs) {
            if (tab.title == title) {
                tab.hidden = false;
                this.titleService.setTitle('管理' + title + ' | ' + this.Global.slogan);
                this.location.go('/admin/' + tab.path);
            }
        }
    }

    constructor(
        private titleService: Title,
        private Global: GlobalService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private toastyService: ToastyService
    ) {
        if (!(Cookie.get('waves_permission').includes('Admin'))) {
            this.toastyService.warning('您无法访问控制面板。');
            this.router.navigate(['/login']);
        }
    }

    private sub; private section;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.section = params['section'];
            let temp = 0;
            if (this.section) {
                for (let tab of this.tabs) {
                    if (tab.path == this.section) {
                        this.switchTab(tab.title);
                        temp++;
                    }
                }
            }
            if (!this.section || (temp == 0)) {
                this.location.go('/admin/news');
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

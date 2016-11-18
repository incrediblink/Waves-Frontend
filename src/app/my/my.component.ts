import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Title } from '@angular/platform-browser';
import { GlobalService } from '../global';
import { Location } from '@angular/common';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
    selector: 'my-home',
    templateUrl: './my.component.html',
    styleUrls: ['my.component.scss']
})
export class MyComponent implements OnInit {

    public tab = {
        event: {
            active: true,
            title: '正在关注的事件'
        },
        setting: {
            active: false,
            title: '我的设置'
        }
    };

    public tabs = ['event', 'setting'];

    private sub; private section;

    public select = (tab) => {
        this.tab[tab].active = true;
        this.titleService.setTitle(this.tab[tab].title + ' | ' + this.Global.slogan);
        this.location.go('/my/' + tab);
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        private Global: GlobalService,
        private location: Location,
        private toastyService: ToastyService
    ) {
        if (!(Cookie.get('waves_user') &&
            Cookie.get('waves_permission'))) {
            let toastOptions: ToastOptions = {
                title: '',
                msg: "您需要先登录才能访问“我的”页面。",
                showClose: true,
                timeout: 5000
            };
            this.toastyService.warning(toastOptions);
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.section = params['section'];
            if (this.section && this.tabs.includes(this.section)) {
                for (let tab of this.tabs) {
                    this.tab[tab].active = false;
                }
                this.tab[this.section].active = true;
            } else
                this.location.go('/my/event');
        });
    }
}

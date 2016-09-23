import { Component, OnInit } from '@angular/core';
import { TagAdminComponent } from './tag';

@Component({
  selector: 'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    public tabs = [
        {
            title: '新闻',
            icon: 'fa-file-text-o',
            hidden: false
        }, {
            title: '事件',
            icon: 'fa-newspaper-o',
            hidden: true
        }, {
            title: '标签',
            icon: 'fa-tags',
            hidden: true
        }, {
            title: '用户',
            icon: 'fa-user',
            hidden: true
        }
    ];

    public switchTab = (title) => {
        for (let tab of this.tabs) {
            tab.hidden = true;
        }
        for (let tab of this.tabs) {
            if (tab.title == title)
                tab.hidden = false;
        }
    } 

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle('控制中心');
    }

    ngOnInit() {
        console.log('Hello Admin');
    }

}

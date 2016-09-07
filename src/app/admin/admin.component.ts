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
            title: '标签',
            icon: 'fa-tags',
            hidden: false
        }, {
            title: '新闻',
            icon: 'fa-file-text-o',
            hidden: true
        }, {
            title: '事件',
            icon: 'fa-newspaper-o',
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

    constructor() {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello Admin');
    }

}

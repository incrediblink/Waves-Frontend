import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-news-admin',
  templateUrl: './news.admin.component.html',
  styleUrls: ['./news.admin.component.scss']
})
export class NewsAdminComponent implements OnInit {
    constructor() {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello news');
    }

}

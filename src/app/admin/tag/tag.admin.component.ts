import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-tag-admin',
  templateUrl: './tag.admin.component.html',
  styleUrls: ['./tag.admin.component.scss']
})
export class TagAdminComponent implements OnInit {
    constructor() {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello tag');
    }

}

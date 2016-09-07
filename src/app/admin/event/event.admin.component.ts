import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-event-admin',
  templateUrl: './event.admin.component.html',
  styleUrls: ['./event.admin.component.scss']
})
export class EventAdminComponent implements OnInit {
    constructor() {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello event');
    }

}

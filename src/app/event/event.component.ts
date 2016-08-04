import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-event',
  templateUrl: './event.component.html',
})
export class EventComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Event Component');
  }

}
import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event';
import { NewsService } from '../service/news';
import { TimelineService } from '../service/timeline';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
  providers: [EventService, NewsService, TimelineService],
})
export class EventComponent implements OnInit {

    constructor(private eventService: EventService, private timeline: TimelineService) { }
    public event: any = this.eventService.getDetail(0);

    public collections: any = this.timeline.get(0);

    ngOnInit() {
        console.log('Event Component');
    }
}

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../service/event';
import { NewsService } from '../service/news';
import { TimelineService } from '../service/timeline';
import { ModalModule } from 'ng2-bootstrap';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
  providers: [EventService, NewsService, TimelineService]
})
export class EventComponent implements OnInit {

    public collections: any
    constructor(private eventService: EventService, private timeline: TimelineService, private ref: ChangeDetectorRef) { 
        this.timeline.get(0)
            .then(result => { this.collections = result; console.log(this.collections); this.ref.detectChanges(); });
    }

    public event: any = this.eventService.getDetail(0);

    public imageSource: string = "图片来自于";

    ngOnInit() {
        console.log('Event Component');
    }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventCenterService } from '../../service/eventCenter';
import { GlobalService } from '../../global';

@Component({
  selector: 'my-event-center',
  styleUrls: ['./eventCenter.component.scss'],
  templateUrl: './eventCenter.component.html',
  providers: [EventCenterService]
})
export class EventCenterComponent {
    public eventCollection;

    constructor(
        private eventCenterService: EventCenterService, 
        private ref: ChangeDetectorRef,
        private Global: GlobalService
    ){
        this.eventCenterService.get()
            .subscribe(
                result => {
                    this.eventCollection = result;
                    for (let event of this.eventCollection) {
                        if (event.HeaderImage)
                            event.ImageUrl = this.Global.cdn + event.HeaderImage.ImageUrl;
                    }
                    this.ref.detectChanges();
                },
                err => console.log(err)
            );
    }
}
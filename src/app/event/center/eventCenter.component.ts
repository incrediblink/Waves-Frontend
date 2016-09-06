import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventCenterService } from '../../service/eventCenter';

@Component({
  selector: 'my-event-center',
  styleUrls: ['./eventCenter.component.scss'],
  templateUrl: './eventCenter.component.html',
  providers: [EventCenterService]
})
export class EventCenterComponent {
    public eventCollection;

    constructor(private eventCenterService: EventCenterService, private ref: ChangeDetectorRef){
        this.eventCenterService.get()
            .subscribe(
                result => {
                    this.eventCollection = result;
                    this.ref.detectChanges();
                },
                err => console.log(err)
            );
    }
}
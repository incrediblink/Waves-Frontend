import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventCenterService } from '../../service/eventCenter';
import { GlobalService } from '../../global';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-event-center',
  styleUrls: ['eventCenter.component.scss'],
  templateUrl: './eventCenter.component.html',
  providers: [EventCenterService]
})
export class EventCenterComponent {
    public eventCollection;
    public opacity = 0;

    constructor(
        private eventCenterService: EventCenterService,
        private ref: ChangeDetectorRef,
        private Global: GlobalService,
        private titleService: Title
    ){
        this.titleService.setTitle(this.Global.slogan);
        this.eventCenterService.get()
            .subscribe(
                result => {
                    this.eventCollection = result;
                    for (let event of this.eventCollection) {
                        if (event.HeaderImage)
                            event.ImageUrl = this.Global.cdn + event.HeaderImage.ImageUrl + '!web';
                    }
                    this.ref.detectChanges();
                    setTimeout(() => {
                        this.opacity = 1;
                        this.ref.detectChanges();
                    }, 200);
                },
                err => console.log(err)
            );
    }
}

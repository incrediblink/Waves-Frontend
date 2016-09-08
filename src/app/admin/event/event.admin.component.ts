import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event';

@Component({
  selector: 'my-event-admin',
  templateUrl: './event.admin.component.html',
  styleUrls: ['./event.admin.component.scss'],
  providers: [EventService]
})
export class EventAdminComponent implements OnInit {
    public tab = {
        addEvent: {
            active: true
        },
        addNews: {
            active: false
        }
    };

    public create = {
        title: null,
        news: null
    }

    public createEvent = (title, news) => {
        this.eventService.create(title, news)
            .subscribe(
                data => {
                    this.create.title = null;
                    this.create.news = null;
                },
                err => console.log(err)
            )
    }

    public add = {
        id: null,
        url: null
    }
    
    public addNews = (id, url) => this.eventService.addNews(id, url)
                                    .subscribe(
                                        data => {
                                            this.add.id = null;
                                            this.add.url = null;
                                        },
                                        err => console.log(err)
                                    )

    constructor(private eventService: EventService) {
        // Do stuff
    }

    ngOnInit() {
    }

}

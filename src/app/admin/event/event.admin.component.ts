import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event';
import { UploadService } from '../../service/upload';
import { ValidationService } from '../../const/validation.service';

@Component({
  selector: 'my-event-admin',
  templateUrl: './event.admin.component.html',
  styleUrls: ['./event.admin.component.scss'],
  providers: [EventService, UploadService]
})
export class EventAdminComponent implements OnInit {

    public tab = {
        addEvent: {
            active: true
        },
        addNews: {
            active: false
        },
        uploadImage: {
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

    public uploadImage = {
        id: null,
        image: null,
        url: null,
        source: null
    }
    
    public addNews = (id, url) => {
        this.eventService.addNews(id, url)
            .subscribe(
                data => {
                    this.add.id = null;
                    this.add.url = null;
                },
                err => console.log(err)
            );
    }

    public upload = (id: string, imageSource: string, sourceUrl: string) => {
        let file = document.getElementById('image').files[0];
        this.uploadService.upload(file)
            .then(result => {
                this.eventService.uploadHeaderImage(id, result.data.Key, imageSource, sourceUrl)
                    .subscribe(
                        data => {
                            console.log(data);
                        }
                    )
            });
    }

    constructor(
        private eventService: EventService, 
        private uploadService: UploadService,
        private Validation: ValidationService    
    ) { }

    ngOnInit() {
    }

}

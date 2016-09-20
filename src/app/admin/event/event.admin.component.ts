import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event';
import { NewsService } from '../../service/news';
import { UploadService } from '../../service/upload';
import { AlertService } from '../../service/alert';
import { ValidationService } from '../../const/validation.service';

@Component({
  selector: 'my-event-admin',
  templateUrl: './event.admin.component.html',
  styleUrls: ['./event.admin.component.scss'],
  providers: [EventService, UploadService, NewsService]
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
        if (this.Validation.EventID.test(url) || this.Validation.Url.test(url))
            this.eventService.addNews(id, url)
                .subscribe(
                    data => {
                        this.add.id = null;
                        this.add.url = null;
                    },
                    err => this.alertService.push(err, 'warning')
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
        private newsService: NewsService,
        private uploadService: UploadService,
        private alertService: AlertService,
        private Validation: ValidationService    
    ) { }

    ngOnInit() {
    }

}
